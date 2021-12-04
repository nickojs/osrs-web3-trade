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
export const ItemWrapper = styled.div`
  width: 50px;
  height: 50px;

  img { 
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
  }
`;