import { PositionContainer } from './styles';

export enum Placement {
  TOPLEFT,
  TOPRIGHT,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  CENTER
}

interface PositionWrapperProps {
  position: Placement;
  display: boolean;
  onTop: boolean;
  children: any;
}

export default (props: PositionWrapperProps) => {
  const {
    position, display, onTop, children
  } = props;

  return (
    <PositionContainer
      placement={position}
      display={display}
      onTop={onTop}
    >
      {children}
    </PositionContainer>
  );
};
