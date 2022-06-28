import { Story, Meta } from '@storybook/react';
import { useEffect } from 'react';
import useToast, { ToastMsg, ToastProvider, ToastType } from '../../context/NotificationContext';
import '../../global.css';
import Notification from './Notification';

interface NotificationStoryProps extends ToastMsg {
  show: boolean
}

const InjectStoryData = (args: NotificationStoryProps) => {
  const { setToast, displayOverride } = useToast();
  const { message, show, type } = args;

  useEffect(() => {
    setToast({ message, type });
  }, [message, type]);

  useEffect(() => {
    displayOverride(show);
  }, [show]);

  useEffect(() => {
    // overrides the default context value (false), to sync with story (true)
    displayOverride(true);
  }, []);

  return (
    <p>
      Storybook data is being injected to the Notification Context
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
    },
    show: {
      type: 'boolean',
      defaultValue: true
    }
  }
} as Meta;

const NotificationStory: Story<NotificationStoryProps> = (args) => (
  <ToastProvider>
    <InjectStoryData {...args} />
    <Notification />
  </ToastProvider>
);

export const NotificationDefault = NotificationStory.bind({});
NotificationDefault.args = {
  show: true,
  message: 'notification',
  type: ToastType.SUCCESS
};
