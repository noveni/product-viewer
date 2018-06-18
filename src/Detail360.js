import React, { Component } from 'react';
// import Swipeable from 'react-swipeable';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import Img from './Img';
import Swipeable from './Swipeable';
import Rotation360deg from './icons/Rotation360deg';

const DetailUi = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  user-select: none;
  pointer-events: none;
`;

const IconWrapper = styled.div`
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
    res = (i - (list.length - 1) < list.length - 1)
      ? i - list.length
      : getNormalizedIndex(i - list.length, list);
  } else if (list[i]) {
    res = i;
  }
  return res;
};

function lt(x, a, b, c, d) { return (x - a) / (b - c) * (d - c) + c; } // eslint-disable-line

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
    this.storeRef = this.storeRef.bind(this);
    this.swiping = debounce(this.swiping.bind(this), 16);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item.id !== nextProps.item.id) {
      this.resetState();
    }
  }

  storeRef(node) {
    if (node) {
      this.ref = node;
    }
  }

  resetState() {
    this.setState(getInitialState());
  }

  swiped(e, deltaX, deltaY, isFlick /* , velocity */) {
    console.log('swipped', 'cleaning lastKnownAbsX');
    /* Flick support on preview: */
    const { onPrevious, onNext } = this.props;
    if (
      isFlick
      && Math.abs(deltaX) > Math.abs(deltaY) // horizontal
    ) {
      if (deltaX > 0) { // flick right
        if (onNext) {
          onNext();
        }
      } else { // flick right
        if (onPrevious) { // eslint-disable-line no-lonely-if
          onPrevious();
        }
      }
    }

    // Required for "continous scrolling":
    this.setState({
      lastKnownAbsX: null,
    });
  }

  swiping(e/* , deltaX, deltaY, absX, absY, velocity */) {
    const { item: { images } } = this.props;
    const { isAnimating, lastKnownAbsX } = this.state;

    if (this.ref && !isAnimating) {
      const visibleFrame = this.state.visibleFrame;
      const theAbsX = Math.round(
        (e.targetTouches && e.targetTouches.length && e.targetTouches[0].pageX)
        || e.pageX
      );
      const isSwipingRight = lastKnownAbsX > theAbsX;

      const expectedIndexDifference = (lastKnownAbsX && Math.round(isSwipingRight
        ? (
          lt(lastKnownAbsX, 0, (window.innerWidth / 2), 0, images.length)
          - lt(theAbsX, 0, (window.innerWidth / 2), 0, images.length)
        )
        : (
          lt(theAbsX, 0, (window.innerWidth / 2), 0, images.length)
          - lt(lastKnownAbsX, 0, (window.innerWidth / 2), 0, images.length)
        )
      * 1.2)) || 0;

      let expectedIndex;
      if (!isSwipingRight) {
        expectedIndex = getNormalizedIndex(visibleFrame - expectedIndexDifference, images, true);
      } else {
        expectedIndex = getNormalizedIndex(visibleFrame + expectedIndexDifference, images, false);
      }

      this.setState({
        lastKnownAbsX: theAbsX,
        isAnimating: true,
        visibleFrame: expectedIndex,
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

    if (visibleFrame !== undefined && item && item.images && (images[visibleFrame] === undefined)) {
      throw new Error('baaaaaad');
    }

    return (
      <Swipeable
        persistEvent
        trackMouse
        delta={Math.round(window.innerWidth / images.length)}
        onSwiping={this.swiping}
        onSwiped={this.swiped}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
        innerRef={this.storeRef}
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
