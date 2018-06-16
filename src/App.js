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
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  & > *:first-child {
    flex-grow: 99;
    flex-shrink: 0;
    min-height: 200px;
  }
  & > *:nth-child(2) {
    flex-shrink: 99;
    flex-grow: 0;
    min-height: 80px;
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
    console.log('handleActiveItemChange', newActiveElementID);
    const current = (
      this.state.items.find(x => x.id === newActiveElementID)
      || this.state.current
    );

    this.setState({ current });
  }

  render() {
    const { current, items } = this.state;
    console.log('current', current);
    return (
      <OutsideWorld>
        <Wrapper>
          <Detail current={current} items={items} />
          <div><List onChange={this.handleActiveItemChange} items={items} /></div>
        </Wrapper>
      </OutsideWorld>
    );
  }
}

App.defaultProps = {
  items: fakeData || [],
};

export default App;
