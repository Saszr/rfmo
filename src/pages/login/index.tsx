import React from 'react';
import styled from 'styled-components';
import { Button, Input } from 'rsuite';
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
        history.pushState(null, '', document.URL);
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
          <Input ref={inputRef} placeholder="Enter Github Token" style={{ marginBottom: '24px' }} />

          <Button
            appearance="primary"
            style={{ width: '100%', backgroundColor: '#5c968a', height: '48px' }}
            onClick={githubLogin}
          >
            <span>
              <VscGithubInverted style={{ fontSize: '20px' }} />
            </span>

            <span style={{ verticalAlign: '3px', marginLeft: '1rem', fontSize: '20px' }}>
              Continue with Github Token
            </span>
          </Button>
        </div>
      </main>
    </Wrapper>
  );
};

export default Login;
