import React from 'react';
import { BiExport, BiImport } from 'react-icons/bi';
import produce from 'immer';

import { exportToGithub, importFromGithub, importFromFile, exportFile } from '@/utils/syncData';
import { get_user_repo, create_user_repo } from '@/services/githubApi';
import useLocalData from '@/hooks/useLocalData';
import ViewTopBar from '@mine/containers/ViewTopBar';

import Styles from '../view.module.less';
import SettingsStyles from './Settings.module.less';

const Settings = () => {
  const importFromFileRef = React.useRef<HTMLInputElement>(null);
  const inputGithubTokenRef = React.useRef<HTMLInputElement>(null);
  const [localData, setLocalData] = useLocalData();

  React.useEffect(() => {
    if (inputGithubTokenRef.current && localData?.github?.token) {
      inputGithubTokenRef.current.value = localData.github.token;
    }
  }, [localData]);

  const handleImportFromFile = () => {
    importFromFileRef.current!.click();
  };

  const handleLinkGithub = async (func: () => void) => {
    if (inputGithubTokenRef.current) {
      const token = inputGithubTokenRef.current.value;
      const curLocalData = produce(localData, (draftState: { github: { token: string } }) => {
        draftState.github = { token };
      });

      setLocalData(curLocalData);

      const setOwner = (params: Record<string, any>) => {
        const data = produce(
          curLocalData,
          (draftState: { github: { owner: Record<string, any> } }) => {
            draftState.github.owner = params.owner;
          },
        );

        setLocalData(data);
      };

      const res = await get_user_repo().catch(async (err) => {
        if (err.message === 'Not Found') {
          const cRes = await create_user_repo();
          setOwner(cRes);
          func();
        }
      });
      setOwner(res);
      func();
    }
  };

  return (
    <>
      <ViewTopBar title="Settings" />

      <div className={Styles.block}>
        <h3>数据同步（Github）</h3>
        <div className={SettingsStyles['settings-form']}>
          <input
            ref={inputGithubTokenRef}
            type="text"
            placeholder="Enter Github Token"
            style={{ margin: '10px 0' }}
          />
          <button
            style={{ marginRight: '20px' }}
            onClick={() => {
              handleLinkGithub(exportToGithub);
            }}
          >
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <BiExport style={{ fontSize: '16px' }} />
            </span>
            上传到 Github
          </button>
          <button
            onClick={() => {
              handleLinkGithub(importFromGithub);
            }}
          >
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <BiImport style={{ fontSize: '16px' }} />
            </span>
            同步到本地
          </button>
        </div>
      </div>

      <div className={Styles.block}>
        <h3>数据同步（File）</h3>
        <div className={SettingsStyles['settings-form']}>
          <button
            style={{ marginRight: '20px' }}
            onClick={() => {
              exportFile();
            }}
          >
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <BiExport style={{ fontSize: '16px' }} />
            </span>
            导出数据文件
          </button>
          <button onClick={handleImportFromFile}>
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <BiImport style={{ fontSize: '16px' }} />
            </span>
            导入数据文件
          </button>
          <input
            ref={importFromFileRef}
            type="file"
            style={{ display: 'none' }}
            onChange={(event) => {
              const fileInfo = event.target.files![0];
              importFromFile(fileInfo);
              event.target.value = '';
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Settings;
