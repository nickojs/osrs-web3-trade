import styled, { css } from 'styled-components';

const disabledGrid = css`
  pointer-events: none;
  cursor: not-allowed;
  opacity: .7;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #493f35;
  height: 100%;
  width: 100%;
  
  border: 4px inset #5d5647;
  box-shadow: inset 0 0 10px black;
`;

export const TradeGrid = styled.div<{ hasAccepted: boolean}>`
  ${({ hasAccepted }) => (hasAccepted && disabledGrid)};

  position: absolute;
  z-index: 9999;
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.3fr 1.3fr 1.4fr;
  gap: 0px 0px;
  grid-template-areas:
    "trade-title trade-title trade-title trade-title"
    "your-trade your-trade other-trade other-trade"
    "your-trade your-trade other-trade other-trade";
  
  height: 395px;
  width: 630px;
  
  color: #ff981f;
  
  div { 
    padding: 6px; 
    text-align: center;
  }
`;

export const TradeTitle = styled(Container)`
  flex-direction: row;
  justify-content: space-between;

  grid-area: trade-title;
`;

export const YourTrade = styled(Container)`
  grid-area: your-trade;
`;

export const OtherTrade = styled(Container)`
  grid-area: other-trade;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 100%; left: 50%;
  transform: translate(-50%, -120%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContainerBaseStyle = css`
  width: 115px;
  height: 60px;
  padding: 8px;

  text-align: center;
  border: 8px double #534f3e;
  background: black;
`;

export const Button = styled.button`
  ${ContainerBaseStyle};  
  width: 120px;

  cursor: pointer;
  color: ${({ color }) => color};

  :disabled { 
    ${disabledGrid}
    filter: grayscale(100%);
  };
`;

export const InventoryData = styled.div`
  ${ContainerBaseStyle};  
  height: 80px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  p{ font-size: 8px; }
`;

export const Text = styled.p`
  text-shadow: 2px 2px black;
`;

export const Title = styled.h1`
  font-size: 1.4em;
  font-weight: bold;
  
  text-shadow: 2px 2px black;  
`;

export const TradeItemsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;

  overflow-y: auto;
  height: 250px;
  width: 240px;

  pointer-events: none;
  list-style: none;
`;

export const RecipientAck = styled.p`
  margin-bottom: 0;
  min-height: 36px;
  
  font-size: 12px;
`;
