import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
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
      // console.log(e);
      console.log(
      'deltaX', deltaX,
      // 'deltaY', deltaY,
      // 'absX', absX,
      // 'absY', absY,
      // 'velocity', velocity
      );

      let visibleFrame = this.state.visibleFrame;

      const isSwipingRight = deltaX > 0 && deltaY < deltaX;
      const isSwipingLeft = deltaX >= 0 && deltaY < deltaX;

      /**
       * |<------------container------------->|
       * |                                    |
       * |     ↑<--swipeLeft-- <↓             |
       * |                                    |
       */
      const precentageMovedOnScreen = containerWidth - Math.abs(deltaX);
      const currentIndex =
        Math.round(lt(precentageMovedOnScreen, 0, window.innerWidth, 0, images.length));

      console.log('currentIndex', currentIndex);
      if (isSwipingRight) {
        visibleFrame = currentIndex >= images.length - 1 ? 0 : currentIndex;
      } else if (isSwipingLeft) {
        visibleFrame = currentIndex <= 0 ? images.length - 1 : currentIndex;
      }

      console.log('§§', images[visibleFrame]);

      this.setState({ visibleFrame });
    }
  }

  swiped(e, deltaX, deltaY, absX, absY, velocity) {
    console.log(e, deltaX, deltaY, absX, absY, velocity);
    // const
  }

  render() {
    const { item } = this.props;
    const { visibleFrame } = this.state;

    return (
      <Swipeable
        trackMouse
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
