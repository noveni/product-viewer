import { PreviousNextButton } from './PreviousNextButton';

export const PreviousButton = PreviousNextButton.extend`
  left: 0;
  &:before {
    content: '⟨';
  }
`;

export default PreviousButton;
