import { Meta, Story } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CategorySelector, { CategorySelectorProps } from './CategorySelector';
import '../../global.css';

const queryClient = new QueryClient();

export default {
  component: CategorySelector,
  title: 'Containers/Marketplace'
} as Meta;

const CategorySelectorStory: Story<CategorySelectorProps> = (args) => (
  <CategorySelector {...args} />
);

export const CategorySelectorDefault = CategorySelectorStory.bind({});

CategorySelectorDefault.args = {
  onChange: (value: number) => console.log(value)
};

CategorySelectorDefault.decorators = [
  (Component) => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
)
];
