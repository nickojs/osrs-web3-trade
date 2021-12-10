export enum Position { 
  TOPLEFT,
  TOPRIGHT,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  CENTER
}
type PositionValues = { width: number; height: number };


export default (
  desiredPosition: Position, 
  componentPosition: PositionValues, 
  windowPosition: PositionValues
): { x: number; y: number } => {
  switch (desiredPosition) {
  case Position.TOPLEFT:
    return { 
      x: 0,
      y: 0 
    };
  case Position.TOPRIGHT:
    return { 
      x: windowPosition.width - componentPosition.width, 
      y: 0 
    };
  case Position.CENTER:
    return { 
      x: (windowPosition.width / 2) - (componentPosition.width / 2), 
      y: (windowPosition.height / 2) - (componentPosition.height / 2) 
    };
  case Position.BOTTOMLEFT:
    return { 
      x: 0, 
      y: windowPosition.height 
    };
  case Position.BOTTOMRIGHT:
    return { 
      x: windowPosition.width - componentPosition.width, 
      y: windowPosition.height - componentPosition.height
    };
  
  default:
    throw new Error("[setPosition] unknown position value received");
  }
};
