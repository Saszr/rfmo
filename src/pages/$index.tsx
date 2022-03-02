import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('login', { replace: true });
  }, []);

  return <></>;
};

export default Page;
