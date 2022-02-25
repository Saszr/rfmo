import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { MarkdownPreview } from '@/components/MarkdownEditor';
import { isNull } from 'lodash';
import { useMemoizedFn } from 'ahooks';

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
  const [shareCardRef, setShareCardRef] = React.useState<HTMLDivElement | null>(null);
  const [imgLoading, setImgLoading] = React.useState(true);

  const initShareCardImg = useMemoizedFn(async () => {
    const shareCardDom = shareCardRef!;

    const canvas = await html2canvas(shareCardDom, {
      useCORS: true,
      allowTaint: true,
      scale: window.devicePixelRatio * 2,
    });

    const image = new Image(shareCardDom.clientWidth, shareCardDom.clientHeight);
    image.src = canvas.toDataURL('image/png');

    shareCardDom.parentNode!.replaceChild(image, shareCardDom);
  });

  React.useEffect(() => {
    if (!isNull(shareCardRef)) {
      initShareCardImg();
      setImgLoading(false);
    }
  }, [shareCardRef, initShareCardImg]);

  return (
    <div style={{ width: '100%' }}>
      <div className={Styles['share-dialog']}>
        <div className={Styles['share-tips']}>
          <p>
            {imgLoading ? '制作图片中 一 一✧ 请稍等...' : '制作完成 (｢･ω･)｢ 可长按或右键保存图片'}
          </p>
        </div>
        <ShareCardWrapper>
          <div ref={(ref) => setShareCardRef(ref)} className={Styles['share-card']}>
            <div className={Styles.card}>
              <div className={Styles.header}>
                <div className={Styles.time}>{item.updated_at}</div>
              </div>
              <MarkdownPreview doc={item.body} />
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
