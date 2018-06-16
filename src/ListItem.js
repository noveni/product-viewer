import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin: 0;
`;

const ListItemUI = styled.div`
  display: flex;
  img {
    width: 100%;
    height: 100%;
    max-height: 90px;
  }
`;

const ListItem = ({ item, onChange }) => (
  <ListItemUI >
    {item && item.src && (
      <Button onClick={() => onChange(item.id)}><img src={item.src} alt="" /></Button>
    )}
  </ListItemUI>
);

export default ListItem;
