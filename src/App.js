import 'whatwg-fetch';
import React, { Component } from 'react';
import styled from 'styled-components';
// import { request } from './utils/request';
import List from './List';
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
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
    flex-grow: 1;
    max-height: 80px;
    height: 80px;
    align-items: center;
    display: flex;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden;
    margin: 8px 32px;
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
  }

  componentDidMount() {
    // request('someurl')
    //   .then((res) => {
    //     this.setState({ items: res });
    //   });
  }

  handleActiveItemChange(newActiveElementID) {
    const current = (
      this.state.items.find(x => x.id === newActiveElementID)
      || this.state.current
    );

    this.setState({ current });
  }

  render() {
    const { current, items } = this.state;

    return (
      <OutsideWorld>
        <Wrapper>
          <div><Detail item={current} items={items} /></div>
          <div><List onChange={this.handleActiveItemChange} items={items} /></div>
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
