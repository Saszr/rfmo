import React from 'react';
import { createContainer } from 'heo';
import { useSize } from 'ahooks';

import type { MemoProps } from '@/store/db';

const useAsideDrawerState = () => {
  const [asideDrawerVisible, setAsideDrawerVisible] = React.useState(false);

  const [curAsideDrawerIs, setCurAsideDrawerIs] = React.useState<boolean | null>(null);
  const bodySize = useSize(document.querySelector('body'));

  React.useEffect(() => {
    if (bodySize) {
      const { width: bodyWidth } = bodySize;
      if (bodyWidth > 900) {
        setAsideDrawerVisible(false);
        setCurAsideDrawerIs(false);
      } else {
        setCurAsideDrawerIs(true);
      }
    }
  }, [bodySize, setCurAsideDrawerIs]);

  const setAsideDrawerIs = (is?: boolean) => {
    if (typeof is === 'undefined') {
      setCurAsideDrawerIs(!curAsideDrawerIs);
    } else {
      setCurAsideDrawerIs(is);
    }
  };

  return {
    asideDrawerIs: curAsideDrawerIs,
    setAsideDrawerIs,
    asideDrawerVisible,
    setAsideDrawerVisible,
  };
};

const MineStoreContainer = () => {
  const { asideDrawerIs, setAsideDrawerIs, asideDrawerVisible, setAsideDrawerVisible } =
    useAsideDrawerState();

  const [memoList, setMemoList] = React.useState<MemoProps[]>([]);

  const [syncLoading, setSyncLoading] = React.useState<boolean>(false);

  return {
    asideDrawerIs,
    setAsideDrawerIs,

    asideDrawerVisible,
    setAsideDrawerVisible,

    memoList,
    setMemoList,

    syncLoading,
    setSyncLoading,
  };
};

export default createContainer(MineStoreContainer);
