import Dexie from 'dexie';
import type { Table } from 'dexie';
import { importInto, exportDB } from 'dexie-export-import';
import { saveAs } from 'file-saver';

interface memo {
  node_id?: string;
  body: string;
  created_at: string;
  updated_at: string;
}

class MySubClassedDexie extends Dexie {
  memo!: Table<memo>;

  constructor() {
    super('rfmoDB');
    this.version(1).stores({
      memo: '&node_id, body, created_at, updated_at',
    });
  }
}

const db = new MySubClassedDexie();

const exportFile = async () => {
  const dbBlob = await exportDB(db, { prettyJson: true });
  saveAs(dbBlob, `rfmoDB.backup.json`);
};

const exportFileInfo = async () => {
  const dbBlob = await exportDB(db, { prettyJson: true });
  return dbBlob;
};

const importFileInfo = async (file: Blob) => {
  await importInto(db, file);
};

export { db, exportFile, exportFileInfo, importFileInfo };
