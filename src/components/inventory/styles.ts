import styled from 'styled-components';
import inventoryBg from '../../assets/inventory.png';

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

export const InventoryContent = styled.div`
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
`;
export const ItemWrapper = styled.a<{ examine: string, displayInformative: boolean }>`
  position: relative;
  width: 50px;
  height: 50px;

  font-size: 12px;
  text-decoration: none;
  
  color: white;

  img { 
    width: 100%;
    height: 100%;
  }

  &:before{
    content: "${({ examine }) => examine}";
    opacity: ${({ displayInformative }) => displayInformative ? 1 : 0};
    
    position: absolute;
    bottom: -5%; left: 0; 
    transform: translateX(-50%);

    height: 20px;
    width: ${({ examine }) => examine.length}ch;
    z-index: 2;
    
    text-align: center;
    line-height: 20px;

    background: #5d5447;
    border: 3px double black;

    transition: .3s opacity;
  }

  &:hover {
    cursor: pointer;
  }
`;
