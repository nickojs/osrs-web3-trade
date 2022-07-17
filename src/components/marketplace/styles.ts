import styled, { css } from 'styled-components';

const disabledArea = css`
  pointer-events: none;
  cursor: not-allowed;
  opacity: .5;
`;

export const MarketPlace = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px;

  width: 600px;
  height: 400px;

  border: 5px double black;
  
  background: #443e30;
`;

export const ListView = styled.ul<{ isLoading: boolean }>`
  ${({ isLoading }) => isLoading && disabledArea};
  flex-grow: 1;

  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  justify-content: space-between;
  grid-gap: 20px;
  
  list-style: none;
  padding: 0 12px;

  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const MakertPlaceTitle = styled.h1`
  width: 100%;

  font-size: 32px;
  text-align: center;

  color: white;
  text-shadow: black 0px 2px 5px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  
  margin: 24px auto;

  & select {
    width: 120px;
  }

  * {
    &:disabled{ 
      ${disabledArea}
    }
  }
`;
