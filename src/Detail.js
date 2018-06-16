import React from 'react';
import styled from 'styled-components';
import Img from './Img';

const DetailUi = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
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
  <DetailUi>
    {
      item && item.iframeSrc &&
      (<iframe style={{ margin: '0 auto' }} src={item.iframeSrc} title="" />)
    }
  </DetailUi>
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
