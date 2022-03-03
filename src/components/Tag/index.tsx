import React from 'react';
import { MdClose } from 'react-icons/md';

import Styles from './Tag.module.less';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
  color?: string;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  visible?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (props, ref) => {
  const { children, style, closable, closeIcon, onClose, onClick } = props;
  const [visible, setVisible] = React.useState(true);

  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);

    if (e.defaultPrevented) {
      return;
    }

    setVisible(false);
  };

  const renderCloseIcon = () => {
    if (closable) {
      return closeIcon ? (
        <span onClick={handleCloseClick}>{closeIcon}</span>
      ) : (
        <span className={Styles['tag-close-icon']} onClick={handleCloseClick}>
          <MdClose />
        </span>
      );
    }
    return null;
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e);
  };

  return (
    <>
      {visible && (
        <span ref={ref} className={Styles.tag} style={{ ...style }} onClick={handleClick}>
          {children}
          {renderCloseIcon()}
        </span>
      )}
    </>
  );
};

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(InternalTag);

export default Tag;
