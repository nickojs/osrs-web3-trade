/* eslint-disable react/require-default-props */
// import useNotification from '../../context/NotificationContext'

import { useEffect } from 'react';
import useNotification from '../../context/NotificationContext';
import {
 ActionsContainer, CloseButton, NotificationContainer, NotificationMsg
} from './styles';

interface NotificationProps {
  actions?: {
    accept: () => void;
    reject: () => void;
  }
  timeout?: number
}

export default ({ actions, timeout }: NotificationProps) => {
  const { dismiss, show, toast } = useNotification();
  const { message, type } = toast;

  useEffect(() => {
    if (show) setTimeout(() => dismiss(), timeout || 2500);
  }, [show]);

  return toast && (
    <NotificationContainer type={type} show={show}>
      <CloseButton type="button" onClick={dismiss}>
        close
      </CloseButton>
      <NotificationMsg>{message}</NotificationMsg>
      {actions && (
        <ActionsContainer>
          <button
            type="button"
            onClick={actions.accept}
          >
            Accept

          </button>
          <button
            type="button"
            onClick={actions.reject}
          >
            Reject
          </button>
        </ActionsContainer>
      )}
    </NotificationContainer>
  );
};
