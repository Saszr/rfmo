import { decode as base64_decode } from 'js-base64';

import { exportFile, exportFileInfo, importFileInfo } from '@/store/db';
import { update_file_contents, get_file_contents } from '@/services/githubApi';

const exportToGithub = async () => {
  const res = await exportFileInfo();
  const reader = new FileReader();
  reader.readAsText(res, 'utf-8');
  reader.onload = () => {
    const readerRes = reader.result as unknown as string;
    update_file_contents(readerRes);
  };
};

const importFromGithub = async () => {
  const res = await get_file_contents();
  const json = base64_decode(res.content);
  const blob = new Blob([json], {
    type: 'text/json',
  });

  importFileInfo(blob);
};

// const fileInfo = event.target.files![0];
const importFromFile = (fileInfo: File) => {
  importFileInfo(fileInfo);
};

const autoSyncToGithub = (setLoading: (flag: boolean) => void) => {
  setLoading(true);
  exportToGithub();
  setTimeout(() => {
    setLoading(false);
  }, 300);
};

const autoSync = (setLoading: (flag: boolean) => void) => {
  const rfmo = localStorage.getItem('rfmo')!;

  const autoSyncGithub = JSON.parse(rfmo).preferences?.autoSyncGithub;

  if (autoSyncGithub) autoSyncToGithub(setLoading);
};

export { exportToGithub, importFromGithub, importFromFile, exportFile, autoSync };
