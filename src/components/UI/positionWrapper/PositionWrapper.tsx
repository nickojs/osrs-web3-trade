import { Placement } from '../../../context/PositionContext';
import { PositionContainer } from './styles';

interface PositionWrapperProps {
  position: Placement;
  display: boolean;
  onTop: boolean;
  setTop: () => void;
  children: JSX.Element;
}

export default (props: PositionWrapperProps) => {
  const {
    position, display, onTop, children, setTop
  } = props;

  return (
    <PositionContainer
      placement={position}
      isOnTop={onTop}
      onClick={setTop}
      show={display}
    >
      {children}
    </PositionContainer>
  );
};
