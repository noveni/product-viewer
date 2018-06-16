import React, { Component } from 'react';
import styled from 'styled-components';
import List from './List';
import Detail from './Detail';


// hard coded for dev
const items = [
  {
    type: 'image',
    src: 'a.jpg',
  }, {
    type: 'image',
    src: 'b.jpg',
  }, {
    type: 'image',
    src: 'c.jpg',
  }, {
    type: 'image',
    src: 'd.jpg',
  }, {
    type: '360',
    src: 'e.jpg',
    images: [
      'e.jpg',
      'f.jpg',
      'g.jpg',
      'h.jpg',
    ],
  },
];

const Wrapper = styled.div`

`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      current: this.props.items[0],
    };
  }

  render() {
    const { items } = this.props;
    const { current } = this.state;

    return (
      <Wrapper>
        <Detail current={current} />
        <List items={items} />
      </Wrapper>
    );
  }
}

App.defaultProps = {
  items: items || [],
};

export default App;
