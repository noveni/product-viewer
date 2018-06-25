import React, { Component } from 'react';
import ListItem from './ListItem';
import { NextButton as ScrollRight } from './Button/NextButton';
import { PreviousButton as ScrollLeft } from './Button/PreviousButton';


class List extends Component {
  constructor(props) {
    super(props);

    this.itemRefs = {};
    // this.onScrollRight = this.onScrollRight.bind(this);
    // this.onScrollLeft = this.onScrollLeft.bind(this);
  }

  componentDidUpdate() {
    const { item } = this.props;
    if (this.itemRefs[item.id]) {
      if (this.itemRefs[item.id].scrollIntoViewIfNeeded) {
        this.itemRefs[item.id].scrollIntoViewIfNeeded();
      } else if (this.itemRefs[item.id].scrollIntoView) {
        this.itemRefs[item.id].scrollIntoView();
      }
    }
  }
  onScrollRight() {
    if (this.wrapperRef) {
      this.wrapperRef.scrollLeft += 280;
    }
  }
  onScrollLeft() {
    if (this.wrapperRef) {
      this.wrapperRef.scrollLeft -= 280;
    }
  }

  render() {
    const { items, onChange, style } = this.props;

    return (
      <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}>
        <ScrollLeft onClick={this.onScrollLeft} style={{ fontSize: '2.8em' }} />
        <div style={{ width: 'calc(100% - 6em)', overflow: 'scroll' }} ref={(node) => { this.wrapperRef = node; }}>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              {
                items.map(item => (
                  <div
                    ref={(node) => { this.itemRefs[item.id] = node; }}
                    style={{ margin: '0 2px' }}
                  >
                    <ListItem
                      item={item}
                      onChange={onChange}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <ScrollRight onClick={this.onScrollRight} style={{ fontSize: '2.8em' }} />
      </div>
    );
  }
}

List.defaultProps = {
  items: [],
};

export default List;
