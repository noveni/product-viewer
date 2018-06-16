import React from 'react';
import styled from 'styled-components';
import Img from './Img';

const ListItemUI = styled.div`
  display: flex;
  min-width: 80px;
  margin: 2px;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ListItem = ({ item, onChange }) => (
  <ListItemUI >
    {item && item.src && (
      <Button onClick={() => onChange(item.id)}>
        <Img style={{ maxHeight: '80px' }} src={item.src} alt="" />
      </Button>
    )}
  </ListItemUI>
);

const ListItemVideo = ({ item, onChange }) => (
  <ListItemUI >
    {item && item.iframeSrc && (
      <Button onClick={() => onChange(item.id)}>
        VIDEO
      </Button>
    )}
  </ListItemUI>
);

const ListItem360 = ({ item, onChange }) => (
  <ListItemUI >
    {item && item.images && (
      <Button onClick={() => onChange(item.id)}>
        <Img style={{ maxHeight: '80px' }} src={item.images[0]} alt="" />
      </Button>
    )}
  </ListItemUI>
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
