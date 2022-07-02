import { Story, Meta } from '@storybook/react';
import TradeScreen, { TradeScreenProps } from './TradeScreen';

export default {
  component: TradeScreen,
  title: 'UI/TradeScreen'
} as Meta;

const TradeScreenStory: Story<TradeScreenProps> = (args) => <TradeScreen {...args} />;

export const TradeScreenDefault = TradeScreenStory.bind({});
TradeScreenDefault.args = {
  recipient: {
    ack: false,
    available: true,
    offeringItems: [],
    username: 'recipient'
  },
  sender: {
    available: true,
    ack: false,
    offeringItems: []
  }
};
