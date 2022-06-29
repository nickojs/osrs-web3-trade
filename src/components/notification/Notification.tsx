// import useNotification from '../../context/NotificationContext'

import { useEffect } from 'react';
import useNotification from '../../context/NotificationContext';
import { CloseButton, NotificationContainer, NotificationMsg } from './styles';

export default () => {
  const { dismiss, show, toast } = useNotification();
  const { message, type } = toast;

  useEffect(() => {
    if (show) setTimeout(() => dismiss(), 2500);
  }, [show]);

  return toast && (
    <NotificationContainer type={type} show={show}>
      <CloseButton type="button" onClick={dismiss}>
        close
      </CloseButton>
      <NotificationMsg>{message}</NotificationMsg>
    </NotificationContainer>
  );
};
