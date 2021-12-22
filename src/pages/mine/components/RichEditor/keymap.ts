import { toggleMark } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { liftListItem, sinkListItem, splitListItem } from 'prosemirror-schema-list';

import type { Schema } from 'prosemirror-model';

export function buildKeymap(schema: Schema) {
  const keys: Record<string, any> = {};
  let type;

  keys['Mod-z'] = undo;
  keys['Mod-y'] = redo;
  keys['Shift-Mod-z'] = redo;

  if ((type = schema.marks.strong)) {
    keys['Mod-b'] = toggleMark(type);
  }

  if ((type = schema.nodes.list_item)) {
    keys.Enter = splitListItem(type);
    keys['Shift-Tab'] = liftListItem(type);
    keys.Tab = sinkListItem(type);
  }

  return keys;
}
