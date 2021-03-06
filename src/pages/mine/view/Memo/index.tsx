import React from 'react';
import { useMemoizedFn } from 'ahooks';

import MineStoreContainer from '@/store/MineStoreContainer';
import ViewTopBar from '@mine/containers/ViewTopBar';
import MemoList from './MemoList';
import { db } from '@/store/db';
import { autoSync } from '@/utils/syncData';
import Editor from './Editor';

import MemoStyles from './Memo.module.less';

const Memo = () => {
  const { memoList, setMemoList, setSyncLoading } = MineStoreContainer.usePicker([
    'memoList',
    'setMemoList',
    'setSyncLoading',
  ]);
  const [listRender, setListRender] = React.useState(false);

  const initList = useMemoizedFn(async () => {
    const res = await db.memo.orderBy('created_at').reverse().toArray();
    setMemoList(res);
    setListRender(true);
  });

  React.useEffect(() => {
    initList();
  }, [initList]);

  return (
    <>
      <ViewTopBar title="MEMO" search={true} refresh={true} />

      <div className={MemoStyles.input}>
        <Editor
          extraBtnArr={{
            submit: (res) => {
              const list = res as unknown as Record<string, any>;
              setMemoList([list!, ...memoList]);
              autoSync(setSyncLoading);
            },
          }}
        />
      </div>

      {listRender ? (
        <MemoList />
      ) : (
        <div className={MemoStyles.memos}>
          <div className={MemoStyles['status-text-container']}>
            <p className={MemoStyles['status-text']}>薛定谔的数据~加载中</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Memo;
