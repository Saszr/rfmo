import React from 'react';
import { useMemoizedFn } from 'ahooks';

import MainViewMenu from '@/pages/mine/components/MainViewMenu';
import { get_list_issues } from '@/services/githubApi';
import MemoCard from './MemoCard';
import MemoEditor from './MemoEditor';

import type { MemoCardProps } from './MemoCard';

import Styles from '../view.module.less';
import MemoStyles from './Memo.module.less';

const Memo = () => {
  const [list, setList] = React.useState([]);
  const memosRef = React.useRef<HTMLDivElement>(null);
  const [memosTop, setMemosTop] = React.useState(0);

  const initList = useMemoizedFn(async () => {
    const res = await get_list_issues();
    setList(res);
  });

  React.useEffect(() => {
    if (memosRef.current) {
      const { top } = memosRef.current.getBoundingClientRect();
      setMemosTop(top);
    }

    initList();
  }, [initList]);

  return (
    <>
      <div className={Styles.topBar}>
        <div className={Styles.left}>
          <MainViewMenu />
          <span>MEMO</span>
        </div>

        <span>🔍</span>
      </div>
      <div className={Styles.input}>
        <MemoEditor />
      </div>

      <div
        ref={memosRef}
        className={MemoStyles.memos}
        style={{ height: `calc(100vh - ${memosTop}px)` }}
      >
        {list.map((item: MemoCardProps['item']) => {
          return <MemoCard key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};

export default Memo;
