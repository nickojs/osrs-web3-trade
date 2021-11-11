import { Story, Meta } from '@storybook/react';
import Inventory from './Inventory';

export default {
  component: Inventory,
  title: 'Containers/Inventory'
} as Meta;

const InventoryStory: Story = (args) => <Inventory {...args} />;

export const EmptyInventory = InventoryStory.bind({});
