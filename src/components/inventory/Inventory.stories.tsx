import { Story, Meta } from '@storybook/react';
import Inventory from './Inventory';
import { items } from '../../mocks/data';

export default {
  component: Inventory,
  title: 'Containers/Inventory'
} as Meta;

const InventoryStory: Story = (args) => <Inventory {...args} />;

export const InventoryEmpty = InventoryStory.bind({});
InventoryEmpty.args = {
  items: []
};

export const InventoryWithItems = InventoryStory.bind({});
InventoryWithItems.args = {
  items
};
