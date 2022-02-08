import React from 'react';
import { FcSearch } from 'react-icons/fc';
import { RiRefreshLine } from 'react-icons/ri';
import classNames from 'classnames';

import { db } from '@/store/db';
import MineStoreContainer from '@/store/MineStoreContainer';

import MainViewMenu from '@/pages/mine/components/MainViewMenu';
import Styles from './ViewTopBar.module.less';

interface handleSearchAllProps {
  searchTargetValue: string;
  setMemoList: (params: Record<string, any>[]) => void;
}

const handleSearchAll = async ({ searchTargetValue, setMemoList }: handleSearchAllProps) => {
  const res = await db.memo
    .orderBy('created_at')
    .reverse()
    .filter((item) => item.body.includes(searchTargetValue))
    .toArray();

  setMemoList(res);
};

interface ViewTopBarProps {
  title: string;
  search?: boolean;
  refresh?: boolean;
}

const Refresh = () => {
  const { syncLoading } = MineStoreContainer.usePicker(['syncLoading']);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '6px' }}>
      <RiRefreshLine
        className={classNames(Styles.refresh, `${syncLoading ? '' : Styles['refresh-paused']}`)}
        style={{ fontSize: '18px' }}
      />
    </span>
  );
};

const ViewTopBar: React.FC<ViewTopBarProps> = ({ title, search = false, refresh = false }) => {
  const { setMemoList } = MineStoreContainer.usePicker(['setMemoList']);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={Styles['top-bar']}>
      <div className={Styles.left}>
        <MainViewMenu />
        <span>{title}</span>
        {refresh && <Refresh />}
      </div>

      {search && (
        <div className={Styles['search-bar-container']}>
          <div className={Styles['search-bar-inputer']}>
            <FcSearch style={{ marginRight: '3px' }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder=""
              onKeyPress={(event) => {
                const searchTargetValue = searchInputRef?.current!.value;

                if (event.code === 'Enter') handleSearchAll({ searchTargetValue, setMemoList });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTopBar;
