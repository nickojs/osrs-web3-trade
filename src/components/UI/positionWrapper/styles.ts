import styled, { css } from 'styled-components';
import { Placement } from './PositionWrapper';

export const positionHandler = (placement: Placement) => {
  switch (placement) {
    case Placement.TOPLEFT:
      return css`
        position: absolute;
        top: 0; left: 0;
      `;
    case Placement.TOPRIGHT:
      return css`
        position: absolute;
        top: 0; right: 0;
      `;
    case Placement.CENTER:
      return css`
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
      `;
    case Placement.BOTTOMLEFT:
      return css`
        position: absolute;
        bottom: 0; left: 0;
      `;
    case Placement.BOTTOMRIGHT:
      return css`
        position: absolute;
        bottom: 0; right: 0;
      `;
    default:
      throw new Error('[placementHandler] unknown position value received');
  }
};

export const PositionContainer = styled.div<{
  placement: Placement
  display: boolean
  onTop: boolean
}>`
  ${({ placement }) => positionHandler(placement)}
  display: ${({ display }) => (display ? 'block' : 'none')};
  z-index: ${({ onTop }) => (onTop ? 666 : 0)};
`;
