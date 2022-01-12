import React from 'react';
import styled from 'styled-components';
import { AiOutlineDatabase } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

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

  const indexedDBLogin = () => {
    navigate('/mine', { replace: true });
  };

  return (
    <Wrapper>
      <main className={Styles['login-main']}>
        <div className={Styles['login-title']}>
          <h1>Login to Rfmo</h1>
        </div>
        <div className={Styles['login-form']}>
          <button
            className={Styles['login-button']}
            onClick={indexedDBLogin}
            style={{ marginTop: '20px' }}
          >
            <span style={{ display: 'flex', marginRight: '1rem' }}>
              <AiOutlineDatabase style={{ fontSize: '20px' }} />
            </span>
            Continue with indexedDB
          </button>
        </div>
      </main>
    </Wrapper>
  );
};

export default Login;
