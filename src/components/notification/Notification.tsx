// import useNotification from '../../context/NotificationContext'

import useNotification from '../../context/NotificationContext';
import { CloseButton, NotificationContainer } from './styles';

export default () => {
  const { dismiss, show, toast } = useNotification();
  const { message, type } = toast;

  return toast && (
    <NotificationContainer type={type} show={show}>
      <CloseButton type="button" onClick={dismiss}>
        close
      </CloseButton>
      <p>{message}</p>
    </NotificationContainer>
  );
};
