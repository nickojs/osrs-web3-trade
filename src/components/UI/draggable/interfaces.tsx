import { PositionComponents } from "../../../context/PositionContext";

export interface DraggableProps {
  children: JSX.Element;
  component: PositionComponents;
  startPosition?: { 
    x: number;
    y: number;
  }
}
