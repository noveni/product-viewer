import 'whatwg-fetch';
import React, { Component } from 'react';
import styled from 'styled-components';
// import { request } from './utils/request';
import List from './List';
import { NextButton } from './Button/NextButton';
import { PreviousButton } from './Button/PreviousButton';
import Detail from './Detail';
import { items as fakeData } from './fakeData';

const OutsideWorld = styled.div`
  width: 500px;
  height: 600px;
  max-width: 100vw;
  max-height: 100vh;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  height: 100%;

  & * {
    user-select: none;
  }

  & > * {
    max-height: 100vh;
    max-width: 100vw;
  }

  & > *:first-child {
    flex-grow: 2;
    flex-shrink: 0;
    height: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
    flex-grow: 1;
    max-height: 80px;
    height: 80px;
    align-items: center;
    display: flex;
    /* overflow-x: scroll; */
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      // items: [],
      current: this.props.items[0],
    };

    this.handleActiveItemChange = this.handleActiveItemChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
  }

  onPrevious() {
    const { items } = this.props;
    const { current } = this.state;
    const currentIndex = items.findIndex(x => x.id === current.id);
    if (currentIndex > -1) {
      // const previous = items[currentIndex - 1]
      //   ? items[currentIndex - 1]
      //   : items[items.length - 1];

      if (items[currentIndex - 1]) {
        this.handleActiveItemChange(
          items[currentIndex - 1].id,
          () => { this.setState({ changedInThisLoop: false }); }
        );
      } else {
        this.handleActiveItemChange(
          items[items.length - 1].id,
          () => { this.setState({ changedInThisLoop: false }); }
        );
      }
    }
  }

  onNext() {
    const { items } = this.props;
    const { current } = this.state;
    const currentIndex = items.findIndex(x => x.id === current.id);
    if (currentIndex > -1) {
      if (items[currentIndex + 1]) {
        this.handleActiveItemChange(
          items[currentIndex + 1].id,
          () => { this.setState({ changedInThisLoop: false }); }
        );
      } else {
        this.handleActiveItemChange(
          items[0].id,
          () => { this.setState({ changedInThisLoop: false }); }
        );
      }
    }
  }

  handleActiveItemChange(newActiveElementID, cb) {
    const current = (
      this.state.items.find(x => x.id === newActiveElementID)
      || this.state.current
    );

    this.setState(
      { current, changedInThisLoop: true }, cb
    );
  }

  render() {
    const {
      current,
      items,
    } = this.state;

    return (
      <OutsideWorld>
        <Wrapper>
          <div style={{ position: 'relative' }}>
            <PreviousButton onClick={this.onPrevious} itemType={current.type} />
            <Detail
              item={current}
              items={items}
              onPrevious={this.onPrevious}
              onNext={this.onNext}
            />
            <NextButton onClick={this.onNext} itemType={current.type} />
          </div>

          {/* this div has overflow-x: scroll */}
          <div>
            <List onChange={this.handleActiveItemChange} items={items} item={current} />
          </div>

        </Wrapper>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            #root { max-height: 100vh; }
            html, body { margin: 0 }
          `,
          }}
        />
      </OutsideWorld>
    );
  }
}

App.defaultProps = {
  items: fakeData || [],
};

export default App;
