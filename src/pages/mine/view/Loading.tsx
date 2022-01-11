import React from 'react';
import loading from '@/assets//images/loading.svg';

const Loading = () => {
  return (
    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
      <img alt="loading" src={loading} style={{ width: '30%' }} />
    </div>
  );
};

export default Loading;
