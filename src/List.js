import React from 'react';
import ListItem from './ListItem';

const List = ({ items }) => (
  <div>
    { items.map(item => (<ListItem item={item} />))}
  </div>
  );

List.defaultProps = {
  items: [],
};

export default List;
