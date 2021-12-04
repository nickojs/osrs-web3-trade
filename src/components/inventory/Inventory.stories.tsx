import { Story, Meta } from '@storybook/react';
import { InventoryProps } from './interfaces';
import Inventory from './Inventory';
import items from './mocks/items';

export default {
  component: Inventory,
  title: 'Containers/Inventory'
} as Meta;

const InventoryStory: Story<InventoryProps> = (args) => <Inventory {...args} />;

export const InventoryEmpty = InventoryStory.bind({});
InventoryEmpty.args = {
  items: []
};

export const InventoryWithItems = InventoryStory.bind({});
InventoryWithItems.args = {
  items
};
