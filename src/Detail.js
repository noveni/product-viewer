import React from 'react';
import styled from 'styled-components';
import Img from './Img';
import RatioBox from './RatioBox';

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
`;

const Detail = ({ item }) => (
  <DetailUi>
    {
      item && item.src &&
      (<Img style={{ margin: '0 auto' }} src={item.src} alt="" />)
    }
  </DetailUi>
);

const Detail360 = ({ item }) => (
  <DetailUi>
    {
      item && item.images &&
      (<Img style={{ margin: '0 auto' }} src={item.images[0]} alt="" />)
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
          <iframe style={{ margin: '0 auto', width: '100%', height: '100%' }} src={item.iframeSrc} title="" />
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
