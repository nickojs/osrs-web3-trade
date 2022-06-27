import { Story, Meta } from '@storybook/react';
import LoginScreen from './LoginScreen';
import '../../global.css';

export default {
  component: LoginScreen,
  title: 'Containers/Auth'
} as Meta;

const LoginScreenStory: Story<any> = (args) => <LoginScreen {...args} />;

export const LoginScreenDefault = LoginScreenStory.bind({});
LoginScreenDefault.args = {};
