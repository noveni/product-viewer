import React, { Component } from 'react';
// import Swipeable from 'react-swipeable';
import Swipeable from './Swipeable';
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

const getNormalizedIndex = (i, list) => {
  let res = 0;
  if (i < 0) {
    console.log('§§', 'smaller than 0');
    const newValueMaybe = list.length - 1 + i;
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
    console.log('§§', 'bigger than length');
    res = (i - (list.length - 1) < list.length - 1)
      ? i - list.length
      : getNormalizedIndex(i - list.length, list);
  } else if (list[i]) {
    console.log('§§', 'is good');
    res = i;
  }
  console.log('§§###', 'getNormalizedIndex:res', res);
  return res;
};

function lt(x, a, b, c, d) { return (x - a) / (b - c) * (d - c) + c; }

const getInitialState = () => ({
  visibleFrame: 0,
  containerLeftOffset: 0,
  containerWidth: 0,
  containerHeight: 0,
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

    // this.swiping = this.swiping.bind(this);
    this.swiped = this.swiped.bind(this);
    this.storeRef = this.storeRef.bind(this);
    this.swiping = debounce(this.swiping.bind(this), 16);
  }

  storeRef(node) {
    if (node) {
      this.ref = node;
      this.setState({
        containerLeftOffset: node.getBoundingClientRect().left,
        containerWidth: node.getBoundingClientRect().width,
        containerHeight: node.getBoundingClientRect().height,
      });
    }
  }

  resetState() {
    this.setState(getInitialState());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item.id !== nextProps.item.id) {
      this.resetState();
    }
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    /* Flick support on preview: */
    const { onPrevious, onNext } = this.props;
    if (
      isFlick
      && Math.abs(deltaX) > Math.abs(deltaY) // horizontal
    ) {
      if (deltaX < 0) { // flick right
        onNext && onNext();
      } else { // flick right
        onPrevious && onPrevious();
      }
    }

    // Required fro "continous scrolling":
    this.setState({
      lastKnownAbsX: null,
    });
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log(
      'deltaX', deltaX, '\n',
      'deltaY', deltaY, '\n',
      'absX', absX, '\n',
      'absY', absY, '\n',
      'velocity', velocity, '\n'
    );

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
        }}
        innerRef={this.storeRef}
      >
        <DetailUi>
          {
            item && item.images &&
            (<Img style={{ margin: '0 auto' }} src={item.images[visibleFrame]} alt="" />)
          }
        </DetailUi>
      </Swipeable>
    );
  }
}

export default Detail360;
