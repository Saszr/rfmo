import React from 'react';
import styled from 'styled-components';
import { VscGithubInverted } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

import useLocalData from '@/hooks/useLocalData';
import { get_user_repo, create_user_repo } from '@/services/githubApi';

import Styles from './index.module.less';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
`;

const Login = () => {
  const navigate = useNavigate();

  const [localData, setLocalData] = useLocalData();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current && localData.token) {
      inputRef.current.value = localData.token;
    }
  }, [localData]);

  const githubLogin = async () => {
    if (inputRef.current) {
      const token = inputRef.current.value;

      const curLocalData = { ...localData, token };
      setLocalData(curLocalData);

      const toMine = (params: any) => {
        setLocalData({ ...curLocalData, owner: params.owner });

        navigate('/mine', { replace: true });
      };

      await get_user_repo()
        .then((res) => {
          toMine(res);
        })
        .catch((err) => {
          if (err.message === 'Not Found') {
            create_user_repo().then((res) => {
              toMine(res);
            });
          }
        });
    }
  };

  return (
    <Wrapper>
      <main className={Styles['login-main']}>
        <div className={Styles['login-title']}>
          <h1>Login to Rfmo</h1>
        </div>
        <div className={Styles['login-form']}>
          <input
            className={Styles['login-input']}
            style={{ marginBottom: '24px' }}
            ref={inputRef}
            type="text"
            placeholder="Enter Github Token"
          />
          <button className={Styles['login-button']} onClick={githubLogin}>
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <VscGithubInverted style={{ fontSize: '20px' }} />
            </span>
            Continue with Github Token
          </button>
        </div>
      </main>
    </Wrapper>
  );
};

export default Login;
