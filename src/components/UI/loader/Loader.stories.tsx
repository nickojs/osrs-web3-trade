import { Story, Meta } from '@storybook/react';
import Loader from './Loader';

export default {
  component: Loader,
  title: 'UI/Loader'
} as Meta;

const LoaderStory: Story = (args) => <Loader {...args} />;

export const LoaderDefault = LoaderStory.bind({});
