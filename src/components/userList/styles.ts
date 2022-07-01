import styled, { css } from 'styled-components';
import { UserStatus } from './UserList';

const borderHelper = (value: UserStatus) => {
  switch (value) {
    case 'online':
      return css`
        cursor: pointer;
        border: 6px ridge lime;
      `;
    case 'away':
      return css`
        cursor: not-allowed;
        border: 6px ridge yellow;
      `;
    case 'busy':
      return css`
        cursor: not-allowed;
        border: 6px ridge red;
      `;

    default:
      throw new Error('[borderHelper]: unknown UserStatus provided');
  }
};

export const Container = styled.div`
  width: 360px;
  padding: 0 16px 16px 16px;
  
  color: white;
  background: #443e30;
  border: 5px double black;
`;

export const UserList = styled.ul`
  max-height: 400px;
  margin: 24px auto;
  margin-left: 6px;
  padding: 0;
  overflow-y: scroll;
`;

export const UserContainer = styled.li<{ status: UserStatus }>`
  ${({ status }) => borderHelper(status)}

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 340px;
  min-height: 80px;
  margin-bottom: 6px;
  background: #494032;
  &:hover {
    background: #6e634e;
  }
`;

export const UserProfilePic = styled.img`
  display: block;
  height: 80px;
  width: 80px;
`;

export const UserDataContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-left: 12px;
  padding: 12px 0;
  & span { 
    color: white;
  }
`;

export const IdSpan = styled.span`
  font-size: 12px;
`;
