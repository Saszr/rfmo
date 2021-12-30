import React from 'react';
import { Whisper, Popover, Dropdown } from 'rsuite';
import type { WhisperInstance } from 'rsuite/Whisper';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import RichEditor from '@/pages/mine/components/RichEditor';

import MemoStyles from '../Memo.module.less';

export interface MemoCardProps {
  item: {
    updated_at: string;
    body: string;
    id: number;
  };
}

const MenuPopover = React.forwardRef(
  (
    {
      onSelect,
      ...rest
    }: {
      onSelect: (eventKey: string | undefined, event: React.SyntheticEvent) => void;
      rest?: {
        children?: React.ReactNode;
      };
    },
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <Popover ref={ref} {...rest} full>
      <Dropdown.Menu onSelect={onSelect}>
        <Dropdown.Item eventKey={'share'}>Share</Dropdown.Item>
        <Dropdown.Item eventKey={'edit'}>Edit</Dropdown.Item>
        <Dropdown.Item eventKey={'delete'}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  ),
);

const MemoCard: React.FC<MemoCardProps> = ({ item }) => {
  const whisperRef = React.useRef<WhisperInstance>(null);
  const iconRef = React.useRef(null);

  const [isEdit, setIsEdit] = React.useState(false);

  const handleSelectMenu = (
    eventKey: string | undefined,
    event: { stopPropagation: () => void },
  ) => {
    if (whisperRef.current) {
      if (eventKey === 'edit') setIsEdit(true);
      whisperRef.current.close();
      event.stopPropagation();
    }
  };

  return (
    <div className={MemoStyles.memo}>
      <div className={MemoStyles.card}>
        {isEdit ? (
          <RichEditor initDoc={item.body} />
        ) : (
          <>
            {' '}
            <div className={MemoStyles.header}>
              <div className={MemoStyles.time}>{item.updated_at}</div>
              <div>
                <Whisper
                  container={() => (iconRef.current ? iconRef.current : document.body)}
                  placement="bottom"
                  trigger="click"
                  ref={whisperRef}
                  speaker={<MenuPopover onSelect={handleSelectMenu} />}
                >
                  <div ref={iconRef}>
                    <MdOutlineMoreHoriz />
                  </div>
                </Whisper>
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
