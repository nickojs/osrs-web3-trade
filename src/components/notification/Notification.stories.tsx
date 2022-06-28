import { Story, Meta } from '@storybook/react';
import { useEffect } from 'react';
import useToast, { ToastMsg, ToastProvider, ToastType } from '../../context/NotificationContext';
import '../../global.css';
import Notification from './Notification';

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

const NotificationStory: Story<ToastMsg> = (args) => (
  <ToastProvider>
    <InjectStoryData {...args} />
    <Notification />
  </ToastProvider>
);

export const NotificationDefault = NotificationStory.bind({});
NotificationDefault.args = {
  message: 'notification',
  type: ToastType.SUCCESS
};
