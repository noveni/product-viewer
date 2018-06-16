import React from 'react';
import styled from 'styled-components';
import Img from './Img';
import RatioBox from './RatioBox';
import Detail360 from './Detail360';

const DetailUi = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const DetailUiVideo = DetailUi.extend`
  max-width: 80vh;
  margin: 0 auto;
  @media (min-height: 400) {
    max-width: 100vh;
  }
  iframe {
    border: none;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
`;


const Detail = ({ item }) => (
  <DetailUi>
    {
      item && item.src &&
      (<Img style={{ margin: '0 auto' }} src={item.src} alt="" />)
    }
  </DetailUi>
);

const DetailVideo = ({ item }) => (
  <DetailUiVideo>
    {
      item && item.iframeSrc &&
      (
        <RatioBox
          ratio="16/9"
          style={{
            maxHeight: 'calc(100% - 80px)',
          }}
        >
          <iframe src={item.iframeSrc} title="" />
        </RatioBox>
      )
  }
  </DetailUiVideo>
);


export default (props) => {
  const { item: { type } } = props;

  switch (type) {
    case 'image':
      return <Detail {...props} />;

    case '360':
      return <Detail360 {...props} />;

    case 'video':
      return <DetailVideo {...props} />;

    default:
      return <Detail {...props} />;
  }
};
