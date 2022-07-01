import { Story, Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './UserList';

const queryClient = new QueryClient();

export default {
  component: UserList,
  title: 'Containers/UserList'
} as Meta;

const UserListStory: Story<any> = (args) => <UserList {...args} />;

export const UserListDefault = UserListStory.bind({});
UserListDefault.args = {
  users: []
};

UserListDefault.decorators = [
  (Component) => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )
];
