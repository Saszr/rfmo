import React from 'react';

import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes, wrapInList } from 'prosemirror-schema-list';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { useProseMirror, ProseMirror } from 'use-prosemirror';

import type { Command } from 'prosemirror-commands';
import type { MarkType } from 'prosemirror-model';
import type { Transaction, EditorState } from 'prosemirror-state';

import { buildKeymap } from './keymap';

import { MdFormatBold, MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';

import Styles from './RichEditor.module.less';

const newSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
});

const toggleMarkCommand = (mark: MarkType): Command => {
  return (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) =>
    toggleMark(mark)(state, dispatch);
};

const isMarkActive = (state: EditorState, mark: MarkType): boolean => {
  const { from, $from, to, empty } = state.selection;
  return empty
    ? !!mark.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, mark);
};

const isBold = (state: EditorState): boolean => {
  return isMarkActive(state, newSchema.marks.strong);
};

const toggleBold = toggleMarkCommand(newSchema.marks.strong);
const toggleOrderedList = wrapInList(newSchema.nodes.ordered_list);
const toggleUnorderedList = wrapInList(newSchema.nodes.bullet_list);

const opts: Parameters<typeof useProseMirror>[0] = {
  schema: newSchema,
  plugins: [keymap(buildKeymap(newSchema)), keymap(baseKeymap), history()],
};

const Editor = () => {
  const editorContentRef = React.useRef(null);

  const [state, setState] = useProseMirror(opts);

  return (
    <div className={Styles['input-box']}>
      <div className={Styles['editor-content']} ref={editorContentRef}>
        <ProseMirror className="ProseMirror" state={state} onChange={setState} />
      </div>
      <div className={Styles['editor-menu-bar']}>
        <div className={Styles['pin-left']}>
          <button
            className={isBold(state) ? Styles['is-active'] : ''}
            onClick={() => toggleBold(state, (tr) => setState(state.apply(tr)))}
          >
            <MdFormatBold style={{ fontSize: '16px' }} />
          </button>

          <button
            style={{ marginLeft: '6px' }}
            onClick={() => toggleUnorderedList(state, (tr) => setState(state.apply(tr)))}
          >
            <MdFormatListBulleted style={{ fontSize: '16px' }} />
          </button>

          <button
            style={{ marginLeft: '6px' }}
            onClick={() => toggleOrderedList(state, (tr) => setState(state.apply(tr)))}
          >
            <MdFormatListNumbered style={{ fontSize: '16px' }} />
          </button>
        </div>
        <div className={Styles['pin-right']}>
          <button>发送</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
