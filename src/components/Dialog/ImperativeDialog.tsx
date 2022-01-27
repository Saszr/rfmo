import React from 'react';
import ReactDOM from 'react-dom';
import { VscClose } from 'react-icons/vsc';

import './dialog.less';

export interface ImperativeDialogProps {
  title?: string;
  content?: string | React.ReactNode;
}

export interface BaseDialogProps extends ImperativeDialogProps {
  clickSpaceDestroy: boolean;
  destroy: () => void;
}

const BaseDialog: React.FC<BaseDialogProps> = (props) => {
  const { children, clickSpaceDestroy, destroy, title = '' } = props;

  const handleSpaceClicked = () => {
    if (clickSpaceDestroy) {
      destroy();
    }
  };

  const handleCloseBtnClick = () => {
    destroy();
  };

  const dom = (
    <div className={'dialog-root'}>
      <div className={'dialog-mask'} />
      <div className={'dialog-wrapper'} onClick={handleSpaceClicked}>
        <div className={'dialog-container'} onClick={(e) => e.stopPropagation()}>
          <div className={'dialog-header-container'}>
            <span>{title}</span>
            <span className={'icon-btn'} onClick={handleCloseBtnClick}>
              <VscClose style={{ fontSize: '20px', color: '#9e9e9e' }} />
            </span>
          </div>
          <div className={'dialog-content-container'}>{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(dom, document.body);
};

const renderImperativeDialog = (config: ImperativeDialogProps) => {
  const { content } = config;

  const container = document.createDocumentFragment();

  const funcSets = {
    destroy: () => {
      ReactDOM.unmountComponentAtNode(container);
    },
  };

  const Fragment = (
    <BaseDialog destroy={funcSets.destroy} clickSpaceDestroy={true} {...config}>
      {content}
    </BaseDialog>
  );

  ReactDOM.render(Fragment, container);

  return funcSets;
};

export default renderImperativeDialog;
