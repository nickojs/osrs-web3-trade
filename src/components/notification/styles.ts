import styled from 'styled-components';
import { ToastType } from '../../context/NotificationContext';
import { resetInput } from '../auth/styles';

const toastColorHelper = {
  [ToastType.SUCCESS]: 'darkgreen',
  [ToastType.ERROR]: 'indianred',
  [ToastType.WARNING]: 'gold'
};

export const NotificationContainer = styled.div<{ type: ToastType, show: boolean }>`
  position: absolute;
  top: 12px;
  left: 50%;
  
  z-index: 8000;

  transform: translateX(-50%);

  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 460px;
  max-height: 300px;

  border-radius: 12px;
  background-color: ${({ type }) => toastColorHelper[type]};

  & p { 
    margin: 2px;
    padding: 24px 0;
    text-align: center;
  }
`;

export const CloseButton = styled.button`
  ${resetInput}
  position: absolute;
  top: -24px;
  right: 48px;

  width: 0px;
  color: transparent;

  &:after{
    display: flex;
    flex-direction: column;
    justify-content: center;
    content: "x";
    font-size: 24px;
    width: 48px;
    height: 48px;
    color: black;
    cursor: pointer;
  }
`;

export const NotificationMsg = styled.p`
  overflow-x: hidden;
  padding: 12px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  
  width: 220px;
  height: 24px;
  padding: 6px 0 24px 0;
`;
