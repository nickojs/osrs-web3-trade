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
  
  z-index: 666;

  transform: translateX(-50%);

  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 460px;
  height: 60px;

  border-radius: 12px;
  background-color: ${({ type }) => toastColorHelper[type]};
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
