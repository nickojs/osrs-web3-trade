/* eslint-disable react/require-default-props */
// import useNotification from '../../context/NotificationContext'

import { useEffect } from 'react';
import useNotification from '../../context/NotificationContext';
import {
 ActionsContainer, CloseButton, NotificationContainer, NotificationMsg
} from './styles';

export default () => {
  const { dismiss, show, toast } = useNotification();
  const { message, type } = toast;

  useEffect(() => {
    if (show) setTimeout(() => dismiss(), toast.timeout || 2500);
  }, [show]);

  return toast && (
    <NotificationContainer type={type} show={show}>
      <CloseButton type="button" onClick={dismiss}>
        close
      </CloseButton>
      <NotificationMsg>{message}</NotificationMsg>
      {toast.actions && (
        <ActionsContainer>
          <button
            type="button"
            onClick={toast.actions.accept}
          >
            Accept

          </button>
          <button
            type="button"
            onClick={toast.actions.reject}
          >
            Reject
          </button>
        </ActionsContainer>
      )}
    </NotificationContainer>
  );
};
