import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import { throttle } from 'lodash';
import styled from 'styled-components';
import Img from './Img';
// import Swipeable from './Swipeable';
import Rotation360deg from './icons/Rotation360deg';

const DetailUi = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  user-select: none;
  pointer-events: none;
`;

const IconWrapper = styled.div `
  position: absolute;
  top: 16px;
  right: 16px;
  fill: rgba(128, 128, 128, .5);
  mix-blend-mode: exclusion;
`;

const getNormalizedIndex = (i, list) => {
  let res = 0;
  if (i < 0) {
    const newValueMaybe = (list.length - 1) + i;
    if (newValueMaybe > 0) {
      if (newValueMaybe < list.length) {
        res = newValueMaybe;
      } else {
        res = (list.length - 1) - (newValueMaybe % Math.abs(i));
      }
    }
    // res = (list.length - 1) - i > 0
    //   ? list.length - 1 - i
    //   : getNormalizedIndex((list.length - 1) - i, list);
  } else if (i > list.length) {
    res = (i - (list.length - 1) < list.length - 1) ?
      i - list.length :
      getNormalizedIndex(i - list.length, list);
  } else if (list[i]) {
    res = i;
  }
  return res;
};

const getInitialState = () => ({
  visibleFrame: 0,
  lastKnownAbsX: null,
  isAnimating: false,
});

class Detail360 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleFrame: 0,
    };
    this.timerRef = null;

    this.swiped = this.swiped.bind(this);
    // this.storeRef = this.storeRef.bind(this);
    // this.swiping = debounce(this.swiping.bind(this), 16);
    this.swiping = throttle(this.swiping.bind(this), 64, { trailing: false });
  }

  resetState() {
    this.setState(getInitialState());
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    this.setState({
      lastKnownAbsX: null,
    });
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    const { item: { images } } = this.props;
    const { isAnimating, lastKnownAbsX } = this.state;
    const visibleFrame = this.state.visibleFrame;
    // console.log(deltaX, absX, velocity);
    // console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity);

    const isSwipingLeft = (deltaX > 0 && absX >= lastKnownAbsX) || (deltaX < 0 && absX <= lastKnownAbsX);
    const isSwipingRight = (deltaX < 0 && absX >= lastKnownAbsX) || (deltaX > 0 && absX <= lastKnownAbsX);

    console.log(deltaX, absX, lastKnownAbsX);
    let expectedIndex;
    if (isSwipingLeft) {
      console.log('on va a gauche');
      expectedIndex = getNormalizedIndex(visibleFrame + 2, images, false);
    } else if (isSwipingRight) {
      console.log('on va a droite');
      expectedIndex = getNormalizedIndex(visibleFrame - 2, images, true);
    } else {
      console.log('on stand by');
      expectedIndex = visibleFrame;
    }
    console.log('visibleFrame', visibleFrame, 'expectedIndex', expectedIndex);
    this.setState({
      lastKnownAbsX: absX,
      isAnimating: true,
      visibleFrame: expectedIndex,
    });
  }

  render() {
    const { item, item: { images } } = this.props;
    const { visibleFrame } = this.state;

    if (visibleFrame !== undefined && item && item.images && (images[visibleFrame] === undefined)) {
      throw new Error('baaaaaad');
    }

    return (
      <Swipeable
        trackMouse
        delta={Math.round(window.innerWidth / images.length)}
        preventDefaultTouchmoveEvent
        onSwiping={this.swiping}
        onSwiped={this.swiped}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <DetailUi>
          {
            item && item.images &&
              (
                <Img style={{ margin: '0 auto' }} src={item.images[visibleFrame]} alt="" />
              )
          }
        </DetailUi>
        <IconWrapper><Rotation360deg /></IconWrapper>
      </Swipeable>
    );
  }
}

export default Detail360;
