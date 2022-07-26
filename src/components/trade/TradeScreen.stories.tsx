import { Story, Meta } from '@storybook/react';
import { items } from '../../mocks/data';
import TradeScreen, { TradeScreenProps } from './TradeScreen';

const mockedUser = {
  userId: '9e873746-78b1-4cc7-ab21-0df9f2135ab4',
  socketId: 'b8LRRqH46LLwTTBJAAAe',
  username: 'maria',
  trading: { isTrading: false, recipientId: '' },
  acceptTrade: false,
  sendingItems: [...items]
};

export default {
  component: TradeScreen,
  title: 'UI/TradeScreen'
} as Meta;

const TradeScreenStory: Story<TradeScreenProps> = (args) => <TradeScreen {...args} />;

export const TradeScreenDefault = TradeScreenStory.bind({});
TradeScreenDefault.args = {
  targetUser: mockedUser
};
