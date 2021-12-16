import React from 'react';
import styled from 'styled-components';

import Stat from '@/pages/mine/components/Stat';
import Sidebar from '@/pages/mine/components/Sidebar';
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

const WrapperAside = styled.aside`
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 240px;
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
      <WrapperAside style={{ width: '240px' }}>
        <h3>Sheng</h3>
        <Stat />
        <Sidebar />
      </WrapperAside>
      <WrapperMain>
        <Main />
      </WrapperMain>
    </Wrapper>
  );
};

export default Mine;
