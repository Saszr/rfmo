import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import Styles from './Memo.module.less';

const ShareCardWrapper = styled.div`
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.07), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.05),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.042), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.035),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.028), 100px 100px 80px rgba(0, 0, 0, 0.02);
  border-radius: 6px;

  > img {
    display: block;
  }

  > canvas {
    display: block;
  }
`;

interface ShareCardProps {
  item: Record<string, any>;
}

const ShareCard: React.FC<ShareCardProps> = (props) => {
  const { item } = props;
  const shareCardRef = React.useRef<HTMLDivElement>(null);

  const initShareCardImg = async () => {
    const shareCardDom = shareCardRef.current!;

    const canvas = await html2canvas(shareCardDom, {
      scale: window.devicePixelRatio * 2,
      height: shareCardDom.clientHeight,
      width: shareCardDom.clientWidth,
    });

    const image = new Image(shareCardDom.clientWidth, shareCardDom.clientHeight);
    image.src = canvas.toDataURL('image/png');

    shareCardDom.parentNode!.replaceChild(image, shareCardDom);
  };

  React.useEffect(() => {
    if (shareCardRef.current) {
      initShareCardImg();
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '16px', backgroundColor: '#fafafa' }}>
        <ShareCardWrapper>
          <div ref={shareCardRef} className={Styles.card}>
            <div className={Styles.header}>
              <div className={Styles.time}>{item.updated_at}</div>
            </div>
            <div className={Styles.content}>
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          </div>
        </ShareCardWrapper>
      </div>
    </div>
  );
};

export default ShareCard;
