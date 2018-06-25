import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import { throttle } from 'lodash';
import styled from 'styled-components';
import Img from './Img';
import { calculateNextFrame } from './calculateNextFrame';
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


const getInitialState = () => ({
  visibleFrame: 0,
  lastKnownAbsX: null,
});

class Detail360 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleFrame: 0,
    };

    this.swiped = this.swiped.bind(this);
    this.swiping = throttle(this.swiping.bind(this), 16, { trailing: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id !== this.props.item.id) {
      this.resetState();
    }
  }

  resetState() {
    this.setState(getInitialState());
  }

  swiped(/* e, deltaX, deltaY, isFlick , velocity */) {
    this.setState({
      lastKnownAbsX: null,
    });
  }

  swiping(e, deltaX, deltaY, absX, absY/* , velocity */) {
    const { item: { images } } = this.props;
    const { lastKnownAbsX } = this.state;
    const visibleFrame = this.state.visibleFrame;
    const nextFrame = calculateNextFrame(
      deltaX,
      deltaY,
      absX,
      absY,
      images,
      (window.innerWidth),
      visibleFrame,
      lastKnownAbsX,
    );

    if (lastKnownAbsX === null) {
      this.setState({
        lastKnownAbsX: absX,
      });
      return false;
    }

    if (nextFrame) {
      this.updateFrame(nextFrame, absX);
    }
    return undefined;
  }

  updateFrame(nextFrame, absX) {
    const { onFrameChange } = this.props;

    this.setState({
      lastKnownAbsX: absX,
      visibleFrame: nextFrame,
    });

    if (onFrameChange) {
      onFrameChange(nextFrame);
    }
  }

  render() {
    const { item, item: { images }, items } = this.props;
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
        {/* <div>
          <MiniList
            style={{ maxWidth: '100px' }} items={item && item.images && item.images.map((imgUrl, i) => ({
              id: imgUrl,
              type: 'image',
              src: imgUrl,
              order: i,
            }))}
            item={item}
          />
        </div> */}
        <IconWrapper><Rotation360deg /></IconWrapper>
      </Swipeable>
    );
  }
}

export default Detail360;
