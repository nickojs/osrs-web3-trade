import { Story, Meta } from '@storybook/react';
import MarketPlace from './MarketPlace';

export default {
  component: MarketPlace,
  title: 'Containers/MarketPlace'
} as Meta;

const MarketPlaceStory: Story = (args) => <MarketPlace {...args} />;

export const MarketPlaceDefault = MarketPlaceStory.bind({});
