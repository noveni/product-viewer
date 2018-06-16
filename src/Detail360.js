import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import Img from './Img';

const DetailUi = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  user-select: none;
  pointer-events: none;
`;

function lt(x, a, b, c, d) { return (x - a) / (b - c) * (d - c) + c; }

class Detail360 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleFrame: 0,
    };
    this.timerRef = null;

    this.swiping = this.swiping.bind(this);
    this.storeRef = this.storeRef.bind(this);
    this.swiping = this.swiping.bind(this);
    // this.swiping = debounce(this.swiping.bind(this), 16);
  }

  storeRef(node) {
    console.log('node', node);
    if (node) {
      this.ref = node;
      this.setState({
        containerLeftOffset: node.getBoundingClientRect().left,
        containerWidth: node.getBoundingClientRect().width,
        containerHeight: node.getBoundingClientRect().height,
      });
    }
  }


  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log(
      // 'e', e, '\n',
      'deltaX', deltaX, '\n',
      'deltaY', deltaY, '\n',
      'absX', absX, '\n',
      'absY', absY, '\n',
      'velocity', velocity, '\n'
    );
    const { item: { images } } = this.props;
    const { containerLeftOffset, isAnimating } = this.state;

    if (this.ref && !isAnimating) {
      const visibleFrame = this.state.visibleFrame;
      const isSwipingHorizontaly = Math.abs(deltaX) > 0; // && Math.abs(deltaY) < Math.abs(deltaX);
      const isSwipingRight = !(deltaX < 0);
      /**
       * |<------------container------------->|
       * |                                    |
       * |     ↑<--swipeLeft-- <↓             |
       * |                                    |
       */
      /*
      console.log('vlocity', velocity);
      const precentageMovedOnScreen = Math.round(
        lt(deltaX, 0, window.innerWidth, 0, 100) * velocity
      );

      console.log(
        'containerWidth', containerWidth, '\n',
        'window.innerWidth', window.innerWidth, '\n',
        'precentageMovedOnScreen', precentageMovedOnScreen, '\n',
        'images.length', images.length, '\n',
      );

      let moveBy = (
        Math.round(
          lt(precentageMovedOnScreen, 0, 100, 0, images.length)
        )
      );

      if (moveBy === -0) {
        moveBy = 0;
      }

      console.log(
        'moveBy', moveBy, 'on', images.length, '\n',
      );


      console.log('moveBy', moveBy);

      if (isSwipingHorizontaly) {
        if ((visibleFrame + moveBy) >= images.length - 1) {
          visibleFrame = 0;// + ((images.length - 1) - visibleFrame)
        } else if ((visibleFrame + moveBy) < 0) {
          visibleFrame = (images.length - 1);
        } else {
          visibleFrame += moveBy;
        }
      }

      console.log('visibleFrame', visibleFrame);

      if (requestAnimationFrame) {
        requestAnimationFrame(() => {
          this.setState({ visibleFrame });
        });
      } else {
        this.setState({ visibleFrame });
      }
*/
      const valueToAddOrSubstract = (
        1
      );

      this.setState({
        isAnimating: true,
        visibleFrame: isSwipingRight
          ? visibleFrame + 1 >= images.length - 1 ? 0 : visibleFrame + 1
          : visibleFrame - 1 <= 0 ? images.length - 1 : visibleFrame - 1,
      }, () => {
        clearTimeout(this.timerRef);
        this.timerRef = setTimeout(() => {
          this.setState({ isAnimating: false });
        }, 16);
      });
    }
  }


  render() {
    const { item, item: { images } } = this.props;
    const { visibleFrame } = this.state;

    return (
      <Swipeable
        trackMouse
        delta={Math.round(window.innerWidth / images.length)}
        onSwiping={this.swiping}
        onSwiped={this.swiped}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
        innerRef={this.storeRef}
      >
        {/* <div ref={this.storeRef} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} > */}
        <DetailUi>
          {
              item && item.images &&
              (<Img style={{ margin: '0 auto' }} src={item.images[visibleFrame]} alt="" />)
            }
        </DetailUi>
        {/* </div> */}
      </Swipeable>
    );
  }
}

export default Detail360;
