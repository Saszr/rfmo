import React from 'react';
import styled from 'styled-components';

import HeatGridChart from '@/pages/mine/components/HeatGridChart';

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
      <WrapperAside>
        <h3>Sheng</h3>
        <HeatGridChart />
      </WrapperAside>
      <WrapperMain>main</WrapperMain>
    </Wrapper>
  );
};

export default Mine;
