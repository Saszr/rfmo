import React from 'react';
import { useMemoizedFn } from 'ahooks';

import MineStoreContainer from '@/store/MineStoreContainer';
import RichEditor from '@/pages/mine/components/RichEditor';
import ViewTopBar from '@mine/containers/ViewTopBar';
import MemoCard from './MemoCard';
import { db } from '@/store/db';

import Styles from '../view.module.less';
import MemoStyles from './Memo.module.less';

const Memo = () => {
  const { memoList, setMemoList } = MineStoreContainer.usePicker(['memoList', 'setMemoList']);

  const memosRef = React.useRef<HTMLDivElement>(null);
  const [memosTop, setMemosTop] = React.useState(0);

  const initList = useMemoizedFn(async () => {
    const res = await db.memo.orderBy('created_at').reverse().toArray();
    setMemoList(res);
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
      <ViewTopBar title="MEMO" search={true} />

      <div className={Styles.input}>
        <RichEditor
          onSubmit={(res) => {
            setMemoList([res!, ...memoList]);
          }}
        />
      </div>

      <div
        ref={memosRef}
        className={MemoStyles.memos}
        style={{ height: `calc(100vh - ${memosTop}px)` }}
      >
        {memoList.map((item, index) => {
          return <MemoCard key={item.node_id} itemIndex={index} item={item} />;
        })}
      </div>
    </>
  );
};

export default Memo;
