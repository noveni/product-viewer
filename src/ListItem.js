import React from 'react';
import styled from 'styled-components';
import ListItemUi from './ListItemUi';
import Button from './Button/Button';
import Rotation360deg from './icons/Rotation360deg';
import Img from './Img';

const IconWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  svg { fill: rgba(128, 128, 128, .5); }
  mix-blend-mode: exclusion;
`;

const ListItem = ({ item, onChange }) => (
  <ListItemUi >
    {item && item.src && (
      <Button onClick={() => onChange(item.id)}>
        <Img style={{ maxHeight: '80px' }} src={item.src} alt="" />
      </Button>
    )}
  </ListItemUi>
);
const ListItem360 = ({ item, onChange }) => (
  <ListItemUi className=".cd-product-viewer-wrapper" >
    {item && item.images && item.images[0] && (
    <Button onClick={() => onChange(item.id)}>
      <Img style={{ maxHeight: '80px' }} src={item.images[0]} alt="" />
    </Button>
    )}
    <IconWrapper><Rotation360deg width="28px" height="28px" /></IconWrapper>
  </ListItemUi>
);

const ListItemVideo = ({ item, onChange }) => (
  <ListItemUi >
    {item && item.iframeSrc && (
      <Button onClick={() => onChange(item.id)}>
        VIDEO
      </Button>
    )}
  </ListItemUi>
);


export default (props) => {
  const { item: { type } } = props;

  switch (type) {
    case 'image':
      return <ListItem {...props} />;

    case '360':
      return <ListItem360 {...props} />;

    case 'video':
      return <ListItemVideo {...props} />;

    default:
      return <ListItem {...props} />;
  }
};
