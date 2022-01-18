import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { debounce } from 'lodash';

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

  const listRef = React.useRef({
    curPage: 1,
    pageSize: 10,
  });

  const [listData, setListData] = React.useState<Record<string, any>[]>([]);

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

  React.useEffect(() => {
    const data = memoList.slice(0, 30);
    setListData(data);
  }, [memoList]);

  const handleListScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target as HTMLDivElement;

    if (scrollHeight - scrollTop < clientHeight + 30) {
      listRef.current.curPage += 1;
      const { curPage, pageSize } = listRef.current;
      const data = memoList.slice(0, curPage * pageSize);
      setListData(data);
    }
  };

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
        style={{ height: `calc(100vh - ${memosTop}px - 20px)` }}
        onScrollCapture={debounce(handleListScroll, 400)}
      >
        {listData.map((item, index) => {
          return <MemoCard key={item.node_id} itemIndex={index} item={item} />;
        })}
      </div>
    </>
  );
};

export default Memo;
