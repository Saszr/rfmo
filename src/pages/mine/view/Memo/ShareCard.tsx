import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import Styles from './Memo.module.less';

const ShareCardWrapper = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
          <div ref={shareCardRef} className={Styles['share-card']}>
            <div className={Styles.card}>
              <div className={Styles.header}>
                <div className={Styles.time}>{item.updated_at}</div>
              </div>
              <div className={Styles.content}>
                <div dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            </div>

            <div className={Styles.footer}>
              <p>via rFmo</p>
            </div>
          </div>
        </ShareCardWrapper>
      </div>
    </div>
  );
};

export default ShareCard;
