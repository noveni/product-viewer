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

    this.swiping = this.swiping.bind(this);
    this.storeRef = this.storeRef.bind(this);
    // this.swiping = this.swiping.bind(this);
    this.swiping = debounce(this.swiping.bind(this), 16);
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

  resetState() {
    this.setState(getInitialState());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.item.id !== nextProps.item.id) {
      this.resetState();
    }
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log(
      // 'e', (e.targetTouches && e.targetTouches.length && e.targetTouches[0].pageX)
      // || e.pageX, '\n',
      'deltaX', deltaX, '\n',
      'deltaY', deltaY, '\n',
      'absX', absX, '\n',
      'absY', absY, '\n',
      'velocity', velocity, '\n'
    );
    const { item: { images } } = this.props;
    const { containerWidth, isAnimating, lastKnownAbsX } = this.state;

    if (this.ref && !isAnimating) {
      const visibleFrame = this.state.visibleFrame;
      // const isSwipingHorizontaly = Math.abs(deltaX) > 0; // && Math.abs(deltaY) < Math.abs(deltaX);
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
      let expectedIndex;
      if (!isSwipingRight) {
        expectedIndex = getNormalizedIndex(visibleFrame - expectedIndexDifference, images, true);
        // expectedIndex = visibleFrame - expectedIndexDifference < 0
        //   ? images.length - 1
        //   : visibleFrame - expectedIndexDifference;
      } else {
        expectedIndex = getNormalizedIndex(visibleFrame + expectedIndexDifference, images, false);
        // expectedIndex = visibleFrame + expectedIndexDifference >= images.length
        //   ? 0 + ((visibleFrame + expectedIndexDifference) - images.length)
        //   : visibleFrame + expectedIndexDifference;
      }

      // expectedIndex = getNormalizedIndex(visibleFrame + expectedIndexDifference);
      // if (expectedIndex < 0) {
      //   expectedIndex = Math.abs(expectedIndex - images.length);
      // }
      // if (expectedIndex >= images.length) {
      //   expectedIndex -= images.length;
      // }


      this.setState({
        lastKnownAbsX: theAbsX,
        isAnimating: true,
        // visibleFrame: isSwipingRight
        //   ? visibleFrame + 1 >= images.length - 1 ? 0 : visibleFrame + 1
        //   : visibleFrame - 1 <= 0 ? images.length - 1 : visibleFrame - 1,
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
