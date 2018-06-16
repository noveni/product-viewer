import React from 'react';
import ListItemUi from './ListItemUi';
import Button from './Button';
import Img from './Img';


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
