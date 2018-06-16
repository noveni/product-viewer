import React from 'react';
import styled from 'styled-components';
import Img from './Img';

const Button = styled.button`
  border: none;
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin: 0;
`;

const ListItemUI = styled.div`
  display: flex;
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

export default ListItem;
