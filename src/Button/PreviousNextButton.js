import Button from './Button';

export const PreviousNextButton = Button.extend`
  ${({ itemType }) => (itemType === 'video' ? 'display: none' : '')};
  position: absolute;
  font-size: 4.2em;
  width: 1em;
  height: 1em;
  height: 100%;
  max-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  outline none;
  &:before {
    z-index: 1;
    font-size: inherit;
    font-weight: 900;
    color: rgba(128, 128, 128, .5);
    mix-blend-mode: exclusion;
  }
  &:hover:before,
  &:focus:before {
    text-shadow: 0px 0px 12px rgba(30, 30, 30, .9), 0px 1px 3px rgba(30, 30, 30, .3);
    color: white;
  }
`;

export default PreviousNextButton;
