import React, { Component } from 'react';
import ListItem from './ListItem';
// import styled from 'styled-components';

// const ListUi = styled.div`
//   display: flex;
// `;

class List extends Component {
  constructor(props) {
    super(props);

    this.itemRefs = {};
  }

  componentDidUpdate() {
    console.log('onComponentDidUpdate');
    const { item } = this.props;
    console.log(this.itemRefs);
    if (this.itemRefs[item.id]) {
      if (this.itemRefs[item.id].scrollIntoViewIfNeeded) {
        this.itemRefs[item.id].scrollIntoViewIfNeeded();
      } else if (this.itemRefs[item.id].scrollIntoView) {
        this.itemRefs[item.id].scrollIntoView();
      }
    }
  }

  render() {
    const { items, onChange } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {
          items.map(item => (
            <div ref={(node) => { this.itemRefs[item.id] = node; }} >
              <ListItem
                item={item}
                onChange={onChange}
              />
            </div>
          ))
        }
      </div>
    );
  }
}

List.defaultProps = {
  items: [],
};

export default List;
