import React from 'react';
import { BiExport, BiImport } from 'react-icons/bi';
import produce from 'immer';
import { isUndefined } from 'lodash';
import { exportToGithub, importFromGithub, importFromFile, exportFile } from '@/utils/syncData';
import { get_user_repo, create_user_repo } from '@/services/githubApi';
import useLocalData from '@/hooks/useLocalData';
import ViewTopBar from '@mine/containers/ViewTopBar';

import SettingsStyles from './Settings.module.less';

const Settings = () => {
  const importFromFileRef = React.useRef<HTMLInputElement>(null);
  const inputGithubTokenRef = React.useRef<HTMLInputElement>(null);
  const checkedAutoSyncGithubRef = React.useRef<HTMLInputElement>(null);
  const [localData, setLocalData] = useLocalData();

  const [verifyGithubToken, setVerifyGithubToken] = React.useState(true);

  React.useEffect(() => {
    if (inputGithubTokenRef.current && localData?.github?.token) {
      inputGithubTokenRef.current.value = localData.github.token;
      // setVerifyGithubToken(false);
    }
  }, [localData, setLocalData]);

  React.useEffect(() => {
    if (checkedAutoSyncGithubRef.current && isUndefined(localData?.preferences?.autoSyncGithub)) {
      checkedAutoSyncGithubRef.current.checked = false;
      const curLocalData = produce(
        localData,
        (draftState: { preferences: { autoSyncGithub: boolean } }) => {
          draftState.preferences = { autoSyncGithub: false };
        },
      );
      setLocalData(curLocalData);
    }

    if (checkedAutoSyncGithubRef.current && localData?.preferences?.autoSyncGithub) {
      const {
        preferences: { autoSyncGithub },
      } = localData;
      checkedAutoSyncGithubRef.current.checked = autoSyncGithub;
    }
  }, [localData, setLocalData]);

  const handleImportFromFile = () => {
    importFromFileRef.current!.click();
  };

  const handleVerifyGithubToken = async () => {
    if (inputGithubTokenRef.current && checkedAutoSyncGithubRef.current) {
      setVerifyGithubToken(true);

      const token = inputGithubTokenRef.current.value;
      const curLocalData = produce(localData, (draftState: Record<string, any>) => {
        draftState.github = { token };
        draftState.preferences = { autoSyncGithub: false };
      });

      setLocalData(curLocalData);
      checkedAutoSyncGithubRef.current.checked = false;

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
          setVerifyGithubToken(false);
        }
      });

      if (isUndefined(res)) return;

      setOwner(res);
      setVerifyGithubToken(false);
    }
  };

  const handleCheckedAutoSyncGithub = () => {
    if (checkedAutoSyncGithubRef.current) {
      const curLocalData = produce(
        localData,
        (draftState: { preferences: { autoSyncGithub: boolean } }) => {
          draftState.preferences = { autoSyncGithub: checkedAutoSyncGithubRef.current!.checked };
        },
      );
      setLocalData(curLocalData);
    }
  };

  return (
    <>
      <ViewTopBar title="Settings" />

      <div className={SettingsStyles['settings-block']}>
        <div className={SettingsStyles.title}>数据同步（Github）</div>
        <div className={SettingsStyles['settings-form']}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input ref={inputGithubTokenRef} type="text" placeholder="Enter Github Token" />
            <button
              style={{ marginLeft: '20px' }}
              onClick={() => {
                handleVerifyGithubToken();
              }}
            >
              验证
            </button>
          </div>

          <button
            style={{ marginRight: '20px' }}
            disabled={verifyGithubToken}
            onClick={() => {
              exportToGithub();
            }}
          >
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <BiExport style={{ fontSize: '16px' }} />
            </span>
            上传到 Github
          </button>
          <button
            disabled={verifyGithubToken}
            onClick={() => {
              importFromGithub();
            }}
          >
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <BiImport style={{ fontSize: '16px' }} />
            </span>
            同步到本地
          </button>
        </div>
      </div>

      <div className={SettingsStyles['settings-block']}>
        <div className={SettingsStyles.title}>数据同步（File）</div>
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

      <div className={SettingsStyles['settings-block']}>
        <div className={SettingsStyles.title}>偏好设置</div>
        <div>
          <p style={{ margin: '5px 0' }}>
            <input
              ref={checkedAutoSyncGithubRef}
              disabled={verifyGithubToken}
              type="checkbox"
              onChange={handleCheckedAutoSyncGithub}
            />
            <label> 自动同步(Github)</label>
          </p>
        </div>
      </div>
    </>
  );
};

export default Settings;
