import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import debounce from 'lodash.debounce';
import DetailUi from './ListItemUi';
import Img from './Img';

function lt(x, a, b, c, d) { return (x - a) / (b - c) * (d - c) + c; }

class Detail360 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleFrame: 0,
    };

    this.swiping = this.swiping.bind(this);
    this.swiped = this.swiped.bind(this);
    this.storeRef = this.storeRef.bind(this);
    this.swiping = debounce(this.swiping.bind(this), 16);
  }

  componentDidMount() {
    // this.setState({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // })
  }

  storeRef(node) {
    if (node) {
      this.ref = node;
      this.setState({
        containerWidth: this.ref.getBoundingClientRect().width,
        containerHeight: this.ref.getBoundingClientRect().height,
      });
    }
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    const { item: { images } } = this.props;
    const { containerWidth } = this.state;

    if (this.ref) {
      const visibleFrame = this.state.visibleFrame;
      const isSwipingHorizontaly = Math.abs(deltaX) > 0 && Math.abs(deltaY) < Math.abs(deltaX);
      const isSwipingRight = !(deltaX > 0);
      /**
       * |<------------container------------->|
       * |                                    |
       * |     ↑<--swipeLeft-- <↓             |
       * |                                    |
       */
      const precentageMovedOnScreen = containerWidth - deltaX;
      const currentIndex =
        Math.round(lt(precentageMovedOnScreen, 0, window.innerWidth, 0, images.length));

      // if (isSwipingHorizontaly) {
      //   if (isSwipingRight) {
      //     visibleFrame = (visibleFrame + currentIndex) >= images.length - 1
      //     ? 0 + ((images.length - 1) - visibleFrame)
      //     : (visibleFrame + currentIndex);
      //   } else {
      //     visibleFrame = (visibleFrame - currentIndex) <= 0
      //     ? (images.length - 1) - (visibleFrame)
      //     : (visibleFrame - currentIndex);
      //   }
      // }

      this.setState({
        visibleFrame: isSwipingRight
          ? visibleFrame + 1 >= images.length - 1 ? 0 : visibleFrame + 1
          : visibleFrame - 1 <= 0 ? images.length - 1 : visibleFrame - 1,
      });
    }
  }

  swiped(e, deltaX, deltaY, absX, absY, velocity) {
    // console.log(e, deltaX, deltaY, absX, absY, velocity);
    // const
  }

  render() {
    const { item } = this.props;
    const { visibleFrame } = this.state;

    return (
      <Swipeable
        trackMouse
        delta={80}
        onSwiping={this.swiping}
        // onSwipingLeft={this.swipingLeft}
        onSwiped={this.swiped}
      // onSwipedUp={this.swipedUp}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <div ref={this.storeRef} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <DetailUi>
            {
              item && item.images &&
              (<Img style={{ margin: '0 auto' }} src={item.images[visibleFrame]} alt="" />)
            }
          </DetailUi>
        </div>
      </Swipeable>
    );
  }
}

export default Detail360;
