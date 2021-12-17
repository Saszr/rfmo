import React from 'react';
import styled from 'styled-components';

import WrapperAside from '@/pages/mine/containers/WrapperAside';
import Main from './main';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0;
  height: 100%;
  margin: 0 auto;
  width: min-content;
`;

const WrapperMain = styled.main`
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: block;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  width: 640px;
`;

const Mine = () => {
  return (
    <Wrapper>
      <WrapperAside />
      <WrapperMain>
        <Main />
      </WrapperMain>
    </Wrapper>
  );
};

export default Mine;
