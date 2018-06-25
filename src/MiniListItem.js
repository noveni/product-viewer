import React from 'react';
// import styled from 'styled-components';
import ListItemUi from './ListItemUi';
// import Button from './Button/Button';
// import Rotation360deg from './icons/Rotation360deg';
// import Thumb360 from './icons/Thumb360';
// import ThumbVideo from './icons/ThumbVideo';
import Img from './Img';

// const IconWrapper = styled.div`
//   position: absolute;
//   top: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   svg {
//     fill: rgba(128, 128, 128);
//     /* width: 90%; */
//     margin: 0 auto;
//   }
//   /* mix-blend-mode: exclusion; */
// `;

export const MiniListItem = ({ item, onChange }) => (
  <ListItemUi style={{ minWidth: '1px' }}>
    {item && item.src && (
      <Img style={{ maxHeight: '32px' }} src={item.src} alt="" />
    )}
  </ListItemUi>
);

export default MiniListItem;
