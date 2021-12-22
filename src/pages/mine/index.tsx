import React from 'react';
import styled from 'styled-components';

import WrapperAside from '@/pages/mine/containers/WrapperAside';
import WrapperMain from '@/pages/mine/containers/WrapperMain';

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

const Mine = () => {
  return (
    <Wrapper>
      <WrapperAside />
      <WrapperMain />
    </Wrapper>
  );
};

export default Mine;
