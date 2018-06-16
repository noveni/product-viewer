import React from 'react';
import ListItem from './ListItem';

const List = ({ items, onChange }) => (
  <div style={{ display: 'flex' }}>
    {
      items.map(item => (
        <ListItem
          item={item}
          onChange={onChange}
        />
      ))
    }
  </div>
  );

List.defaultProps = {
  items: [],
};

export default List;
