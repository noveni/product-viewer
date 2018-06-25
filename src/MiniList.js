import React, { Component } from 'react';
import MiniListItem from './MiniListItem';
import { NextButton as ScrollRight } from './Button/NextButton';
import { PreviousButton as ScrollLeft } from './Button/PreviousButton';
import { lt } from './calculateNextFrame';


class List extends Component {
  constructor(props) {
    super(props);

    this.itemRefs = {};
    // this.onScrollRight = this.onScrollRight.bind(this);
    // this.onScrollLeft = this.onScrollLeft.bind(this);
  }

  componentDidMount() {

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
  // onScrollRight() {
  //   if (this.wrapperRef) {
  //     this.wrapperRef.scrollLeft += 280;
  //   }
  // }
  // onScrollLeft() {
  //   if (this.wrapperRef) {
  //     this.wrapperRef.scrollLeft -= 280;
  //   }
  // }
  getTransform(items, visibleFrame) {
    if (this.wrapperRef) {
      const width = this.wrapperRef.getBoundingClientRect().width;
      const itemWidth = Math.round(width / items.length);
      const itemLengthToPixel = lt(visibleFrame, 0, items.length, -(width / 2), (width / 2));
      return `${itemLengthToPixel}px`;


      // if (visibleFrame > (items.length / 2)) {
      //   // add n time itemSidth pixel
      //   const numToAdd = itemWidth *
      //   return `${numToAdd}px`
      // } else {
      //   // substract n times itemWidth
      // }
    }
    return 0;
  }

  render() {
    const { items, onChange, style, visibleFrame } = this.props;


    return (
      <div style={{ maxWidth: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}>
        <div style={{ maxWidth: '100%', position: 'relative' }}>
          <div
            style={{
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `translateX(${this.getTransform(items, visibleFrame)})`,
            }}
            ref={(node) => { this.wrapperRef = node; }}
          >
            {
              items.map((item, i) => (
                <div
                  ref={(node) => { this.itemRefs[item.id] = node; }}
                  style={{
                    maxHeight: '32px',
                    overflow: 'hidden',
                    ...(visibleFrame === i ? { border: '1px solid red' } : {}),
                  }}
                >
                  <MiniListItem
                    item={item}
                    onChange={onChange}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  items: [],
};

export default List;
