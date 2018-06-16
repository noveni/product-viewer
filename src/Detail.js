import React from 'react';
import styled from 'styled-components';
import Img from './Img';

const DetailUi = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Details = ({ current }) => (
  <DetailUi>
    {
      current && current.src &&
      (<Img style={{ margin: '0 auto' }} src={current.src} alt="" />)
    }
  </DetailUi>
);

export default Details;
