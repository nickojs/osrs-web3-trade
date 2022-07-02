import styled, { css } from 'styled-components';

export const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  height: 60px;
`;

export const ProfilePic = styled.img<{ isSelected: boolean }>`
  box-sizing: border-box;
  height: 60px;
  width: 60px;
  margin: 0 6px;
  ${({ isSelected }) => isSelected && css`border: 1px solid red;`}
`;

export const Title = styled.p`color: white;`;
