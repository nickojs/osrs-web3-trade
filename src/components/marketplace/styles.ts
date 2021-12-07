import styled from 'styled-components';

export const MarketPlace = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 600px;
  height: 400px;

  border: 5px double black;
  
  background: #443e30;
`;

export const ListView = styled.ul`
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

  font-size: 46px;
  font-family: system;
  text-align: center;

  color: white;
  text-shadow: black 0px 2px 5px;
`;

export const Search = styled.input`
  padding: 12px;
  width: 80%;
  margin: 0 auto;
  
  line-height: 24px;
  text-align: center;

  border-radius: 12px;
  border: 3px inset #292014;

  color: white;
  font-weight: bold;
  background: #372e22;
`;
