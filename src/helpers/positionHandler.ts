import { PositionProperties, Placement } from '../context/PositionContext';

export default (
  component: PositionProperties,
  window: { width: number, height: number }
): { x: number; y: number } => {
  const { placement } = component;
  switch (placement) {
    case Placement.TOPLEFT:
      return {
        x: 0,
        y: 0
      };
    case Placement.TOPRIGHT:
      return {
        x: window.width - component.width,
        y: 0
      };
    case Placement.CENTER:
      return {
        x: (window.width / 2) - (component.width / 2),
        y: (window.height / 2) - (component.height / 2)
      };
    case Placement.BOTTOMLEFT:
      return {
        x: 0,
        y: window.height
      };
    case Placement.BOTTOMRIGHT:
      return {
        x: window.width - component.width,
        y: window.height - component.height
      };

    default:
      throw new Error('[setPosition] unknown position value received');
  }
};
