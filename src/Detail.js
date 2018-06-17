import React, { Component } from 'react';
import Swipeable from './Swipeable';
import styled from 'styled-components';
import Img from './Img';
import RatioBox from './RatioBox';
import Detail360 from './Detail360';

const DetailUi = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const DetailUiVideo = DetailUi.extend`
  max-width: 80vh;
  margin: 0 auto;
  @media (min-height: 400) {
    max-width: 100vh;
  }
  iframe {
    border: none;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
`;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.swiped = this.swiped.bind(this);
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    /* Flick support on preview: */
    const { onPrevious, onNext } = this.props;
    if (
      isFlick
      && Math.abs(deltaX) > Math.abs(deltaY) // horizontal
    ) {
      if (deltaX > 0) { // flick right
        onNext && onNext();
      } else { // flick right
        onPrevious && onPrevious();
      }
    }
  }

  render() {
    const { item } = this.props;

    return (
      <Swipeable
        onSwiped={this.swiped}
        style={{ display: 'flex' }}
      >
        <DetailUi>
          {
          item && item.src &&
          (<Img style={{ margin: '0 auto' }} src={item.src} alt="" />)
        }
        </DetailUi>
      </Swipeable>
    );
  }
}


class DetailVideo extends Component {
  constructor(props) {
    super(props);
    this.swiped = this.swiped.bind(this);
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    /* Flick support on preview: */
    const { onPrevious, onNext } = this.props;
    if (
      isFlick
      && Math.abs(deltaX) > Math.abs(deltaY) // horizontal
    ) {
      if (deltaX > 0) { // flick right
        onNext && onNext();
      } else { // flick right
        onPrevious && onPrevious();
      }
    }
  }

  render() {
    const { item } = this.props;

    return (
      <div style={{ width: 'calc(100% - 6em)' }}>
        <DetailUiVideo>
          {
            item && item.iframeSrc &&
            (
              <RatioBox
                ratio="16/9"
                style={{
                  maxHeight: 'calc(100% - 80px)',
                }}
              >
                <iframe src={item.iframeSrc} title="" />
              </RatioBox>
            )
          }
        </DetailUiVideo>
      </div>
    );
  }
}

export default (props) => {
  const { item: { type } } = props;

  switch (type) {
    case 'image':
      return <Detail {...props} />;

    case '360':
      return <Detail360 {...props} />;

    case 'video':
      return <DetailVideo {...props} />;

    default:
      return <Detail {...props} />;
  }
};
