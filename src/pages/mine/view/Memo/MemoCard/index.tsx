import React from 'react';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { Popover } from 'antd';
import RichEditor from '@/pages/mine/components/RichEditor';

import MemoStyles from '../Memo.module.less';

export interface MemoCardProps {
  item: {
    updated_at: string;
    body: string;
    id: number;
  };
}

const MemoCardMore = React.forwardRef(
  (
    {
      onSelect,
      ...rest
    }: {
      onSelect: (key: string | undefined) => void;
      rest?: {
        children?: React.ReactNode;
      };
    },
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <div ref={ref} {...rest}>
      <button type="button" onClick={() => onSelect('share')}>
        Share
      </button>
      <button type="button" onClick={() => onSelect('edit')}>
        Edit
      </button>
      <button type="button" onClick={() => onSelect('delete')}>
        Delete
      </button>
    </div>
  ),
);

const MemoCard: React.FC<MemoCardProps> = ({ item }) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const handleSelectMenu = (key: string | undefined) => {
    if (key === 'edit') setIsEdit(true);
  };
  return (
    <div className={MemoStyles.memo}>
      <div className={MemoStyles.card}>
        {isEdit ? (
          <RichEditor initDoc={item.body} />
        ) : (
          <>
            <div className={MemoStyles.header}>
              <div className={MemoStyles.time}>{item.updated_at}</div>
              <div>
                <Popover content={<MemoCardMore onSelect={handleSelectMenu} />} trigger="hover">
                  <MdOutlineMoreHoriz />
                </Popover>
              </div>
            </div>
            <div className={MemoStyles.content}>
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MemoCard;
