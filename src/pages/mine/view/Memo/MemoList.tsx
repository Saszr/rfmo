import React from 'react';
import { debounce } from 'lodash-es';

import MineStoreContainer from '@/store/MineStoreContainer';
import MemoCard from './MemoCard';

import type { MemoProps } from '@/store/db';
import MemoStyles from './Memo.module.less';

const MemoList = () => {
  const { memoList } = MineStoreContainer.usePicker(['memoList']);

  const [memosTop, setMemosTop] = React.useState(0);
  const memosRef = React.useRef<HTMLDivElement>(null);

  const [listData, setListData] = React.useState<MemoProps[]>([]);

  const listRef = React.useRef({
    curPage: 1,
    pageSize: 30,
  });

  React.useEffect(() => {
    if (listRef.current) {
      const { pageSize } = listRef.current;
      const data = memoList.slice(0, pageSize);
      setListData(data);
    }
  }, [memoList]);

  React.useEffect(() => {
    if (memosRef.current) {
      const { top } = memosRef.current.getBoundingClientRect();
      setMemosTop(top);
    }
  }, []);

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
    <div
      ref={memosRef}
      className={MemoStyles.memos}
      style={{ height: `calc(100vh - ${memosTop}px - 26px)` }}
      onScrollCapture={debounce(handleListScroll, 400)}
    >
      {listData.map((item, index) => {
        return <MemoCard key={item.node_id} itemIndex={index} item={item} />;
      })}

      <div className={MemoStyles['status-text-container']}>
        <p className={MemoStyles['status-text']}>
          {listData.length === memoList.length ? '所有数据加载完啦 🎉' : '薛定谔的数据～加载中'}
        </p>
      </div>
    </div>
  );
};

export default MemoList;
