import React from 'react';
import ListItem from './ListItem';
// import styled from 'styled-components';

// const ListUi = styled.div`
//   display: flex;
// `;

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
