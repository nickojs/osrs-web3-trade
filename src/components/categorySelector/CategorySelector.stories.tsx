import { Meta, Story } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CategorySelector from './CategorySelector';
import '../../global.css';

const queryClient = new QueryClient();

export default {
  component: CategorySelector,
  title: 'Containers/Marketplace'
} as Meta;

const CategorySelectorStory: Story = () => <CategorySelector />;

export const CategorySelectorDefault = CategorySelectorStory.bind({});
CategorySelectorDefault.decorators = [
  (Component) => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
)
];
