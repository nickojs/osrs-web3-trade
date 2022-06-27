import styled, { css } from 'styled-components';
import inventoryBg from '../../assets/inventory.png';

const selectedBorder = css`
  border: 2px inset white;
`;

export const Inventory = styled.div`
  position: relative;
  height: 532px;
  width: 382px;

  filter: drop-shadow(5px 5px 5px black);

  background-image: url(${inventoryBg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const InventoryContent = styled.ul`
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."; 

  justify-content: space-around; 
  align-content: center; 
  justify-items: center; 
  align-items: center; 

  padding: 60px 45px;
  height: 412px;

  list-style: none;
`;

export const ItemWrapper = styled.li<{ examine: string, displayInformative: boolean }>`
  position: relative;
  width: 55px;
  height: 55px;
  padding: 6px;
  margin: 6px;
  box-sizing: border-box;

  font-size: 12px;
  text-decoration: none;
  
  color: white;

  border: 2px solid transparent;
  ${({ displayInformative }) => displayInformative && selectedBorder};

  img { 
    width: 100%;
    height: 100%;
  }

  &:before{
    content: "${({ examine }) => examine || 'No description available.'}";
    opacity: ${({ displayInformative }) => (displayInformative ? 1 : 0)};
    
    position: absolute;
    bottom: -5%; left: 0; 
    transform: translateX(-50%);

    height: 20px;
    width: ${({ examine }) => examine?.length || 24}ch;
    z-index: ${({ displayInformative }) => (displayInformative ? 2 : -1)};
    
    text-align: center;
    line-height: 20px;

    background: #5d5447;
    border: 3px double black;

    transition: .3s opacity;
  }

  &:hover {
    cursor: pointer;
    ${selectedBorder}
  }
`;
