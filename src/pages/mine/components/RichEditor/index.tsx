import React from 'react';

import { Schema, DOMSerializer, DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes, wrapInList } from 'prosemirror-schema-list';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { useProseMirror, ProseMirror } from 'use-prosemirror';
import { EditorState } from 'prosemirror-state';
import { useMemoizedFn } from 'ahooks';

import type { Command } from 'prosemirror-commands';
import type { MarkType } from 'prosemirror-model';
import type { Transaction } from 'prosemirror-state';

import { buildKeymap } from './keymap';
import { create_issue } from '@/services/githubApi';

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

const getOpts = () => {
  const opts: Parameters<typeof useProseMirror>[0] = {
    schema: newSchema,
    plugins: [keymap(buildKeymap(newSchema)), keymap(baseKeymap), history()],
  };

  return opts;
};

interface EditorProps {
  initDoc?: string;
}

const Editor: React.FC<EditorProps> = ({ initDoc }) => {
  const viewRef = React.useRef(null);
  const [state, setState] = useProseMirror(getOpts());
  const [curInputValue, setCurInputValue] = React.useState('');

  const initEditor = useMemoizedFn(() => {
    const opts = getOpts();

    if (viewRef.current) {
      if (initDoc) {
        const doc = new DOMParser().parseFromString(initDoc, 'text/html');
        const node = ProseMirrorDOMParser.fromSchema(schema).parse(doc, {
          preserveWhitespace: true,
        });
        opts.doc = node;
      }

      const initState = EditorState.create(opts);
      setState(initState);

      // if (initDoc) setState(state.apply(state.tr.replaceSelectionWith(newSchema.text(initDoc))));
    }
  });

  React.useEffect(() => {
    initEditor();
  }, [initEditor]);

  React.useEffect(() => {
    const fragment = DOMSerializer.fromSchema(newSchema).serializeFragment(state.doc.content);
    const div = document.createElement('div');
    div.appendChild(fragment);
    setCurInputValue(div.innerHTML);
  }, [state]);

  const submit = () => {
    create_issue(curInputValue).then(() => {
      const opts = getOpts();

      const newState = EditorState.create(opts);
      setState(newState);
    });
  };

  return (
    <div className={Styles['input-box']}>
      <div className={Styles['editor-content']}>
        <ProseMirror ref={viewRef} className="ProseMirror" state={state} onChange={setState} />
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
          <button onClick={submit}>发送</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
