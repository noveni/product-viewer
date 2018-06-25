import styled from 'styled-components';

const Button = styled.button.attrs({
  onMouseOut: () => (e) => { e.target.blur(); },
})`
  border: none;
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  line-height: 0;
  font-size: 0;
`;

export default Button;
