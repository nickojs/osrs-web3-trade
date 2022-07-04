import styled, { css } from 'styled-components';
import inventoryBg from '../../assets/inventory.png';
import disclaimer from '../../assets/menu/disclaimer.png';
import inventory from '../../assets/menu/inventory.png';
import logout from '../../assets/menu/logout.png';
import trade from '../../assets/menu/trade.png';
import userlist from '../../assets/menu/userlist.png';

export type InventoryMenuType = 'disclaimer' | 'inventory' | 'logout' | 'trade' | 'userlist'

const inventoryMenuHelper = (value: InventoryMenuType) => {
  switch (value) {
    case 'disclaimer':
      return disclaimer;
    case 'inventory':
      return inventory;
    case 'logout':
      return logout;
    case 'trade':
      return trade;
    case 'userlist':
      return userlist;
    default:
      throw new Error('[inventoryMenuHelper]: unknown InventoryMenu type received');
  }
};

const resetButton = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;
`;

export const Container = styled.div`
  position: relative;
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

export const InventoryMenu = styled.nav`
  position: absolute;
  top: 0; left: 0; right: 0;
  
  z-index: 2;

  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  height: 55px;
`;

export const InventoryMenuEntry = styled.button<{ icon: InventoryMenuType }>`
  ${resetButton}

  width: 48px;
  height: 48px;
  
  align-self: center;
  cursor: pointer;

  background-image: url(${({ icon }) => inventoryMenuHelper(icon)});
  background-size: 40px 40px;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ItemWrapper = styled.div`
width: 55px;
  height: 55px;
  padding: 6px;
  margin: 6px;
  box-sizing: border-box;

  font-size: 12px;
  text-decoration: none;
  
  color: white;

  border: 2px solid transparent;

  img { 
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 50%; left: -100%; 
  transform: translate(-50%, -50%);

  width: 150px;
  z-index: 2;
  
  text-align: center;
  line-height: 20px;

  background: #5d5447;
  border: 3px double black;

  transition: .3s opacity;
`;
