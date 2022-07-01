import { Story, Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MarketPlace from './MarketPlace';

const queryClient = new QueryClient();

export default {
  component: MarketPlace,
  title: 'Containers/MarketPlace',
  parameters: {
    actions: {
      handles: ['onchange', 'input']
    }
  }
} as Meta;

const MarketPlaceStory: Story = (args) => <MarketPlace {...args} />;

export const MarketPlaceDefault = MarketPlaceStory.bind({});
MarketPlaceDefault.decorators = [
  (Component) => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )
];
