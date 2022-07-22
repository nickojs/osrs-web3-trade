import styled, { css } from 'styled-components';
import { Placement } from '../../../context/PositionContext';

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
    case Placement.UPPERCENTER:
      return css`
        position: absolute;
        top: 20%; left: 50%;
        transform: translate(-50%, -20%);
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
  show: boolean
  isOnTop: boolean
}>`
  ${({ placement }) => positionHandler(placement)}
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: ${({ isOnTop }) => (isOnTop ? 666 : 0)};
`;
