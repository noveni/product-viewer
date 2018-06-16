import React from 'react';
import styled from 'styled-components';

const DetailUi = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    max-height: 400px;
  }
`;

const Details = ({ current }) => (
  <DetailUi>
    {
      current && current.src &&
      (<img src={current.src} alt="" />)
    }
  </DetailUi>
);

export default Details;
