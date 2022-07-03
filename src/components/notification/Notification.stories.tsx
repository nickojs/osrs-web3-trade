import { Story, Meta } from '@storybook/react';
import { useEffect } from 'react';
import useToast, { ToastMsg, ToastProvider, ToastType } from '../../context/NotificationContext';
import '../../global.css';
import Notification from './Notification';

interface NotificationStoryProps extends ToastMsg {
  timeout: number;
}

const InjectStoryData = (args: ToastMsg) => {
  const { setToast } = useToast();
  const { message, type } = args;

  useEffect(() => {
    setToast({ message, type });
  }, [message, type]);

  return (
    <p>
      Storybook data is being injected into the Notification Context
    </p>
  );
};

export default {
  component: Notification,
  title: 'UI/Notification',
  argTypes: {
    type: {
      options: [ToastType.SUCCESS, ToastType.ERROR, ToastType.WARNING],
      control: { type: 'select' }
    },
    message: {
      type: 'string'
    }
  }
} as Meta;

const NotificationStory: Story<NotificationStoryProps> = (args) => {
  const { timeout, actions } = args;
  return (
    <ToastProvider>
      <InjectStoryData {...args} />
      <Notification timeout={timeout} actions={actions || undefined} />
    </ToastProvider>
  );
};

export const NotificationDefault = NotificationStory.bind({});
NotificationDefault.args = {
  message: 'notification',
  type: ToastType.SUCCESS,
  timeout: 600000
};

export const NotificationWithActions = NotificationStory.bind({});
NotificationWithActions.args = {
  message: 'notification',
  type: ToastType.WARNING,
  timeout: 600000,
  actions: {
    accept: () => console.log('accept'),
    reject: () => console.log('reject')
  }
};
