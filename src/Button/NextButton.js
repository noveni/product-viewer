import { PreviousNextButton } from './PreviousNextButton';

export const NextButton = PreviousNextButton.extend`
  right: 0;
  &:before {
    content: '⟩';
  }
`;

export default NextButton;
