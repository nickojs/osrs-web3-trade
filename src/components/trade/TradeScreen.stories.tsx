import { Story, Meta } from '@storybook/react';
import { items } from '../../mocks/data';
import TradeScreen, { TradeScreenProps } from './TradeScreen';

export default {
  component: TradeScreen,
  title: 'UI/TradeScreen'
} as Meta;

const TradeScreenStory: Story<TradeScreenProps> = (args) => <TradeScreen {...args} />;

export const TradeScreenDefault = TradeScreenStory.bind({});
TradeScreenDefault.args = {
  recipientName: 'fulano',
  receivingItems: items.slice(0, 2),
  sendingItems: items.slice(2, 4),
  recipientAccept: false,
  senderAccept: false
};
