import { Story, Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginScreen from './LoginScreen';
import '../../global.css';

const queryClient = new QueryClient();

export default {
  component: LoginScreen,
  title: 'Containers/Auth'
} as Meta;

const LoginScreenStory: Story<any> = (args) => <LoginScreen {...args} />;

export const LoginScreenDefault = LoginScreenStory.bind({});
LoginScreenDefault.decorators = [
  (Component) => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )
];
