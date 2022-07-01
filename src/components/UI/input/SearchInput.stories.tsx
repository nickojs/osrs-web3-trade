import { Story, Meta } from '@storybook/react';
import SearchInput, { SearchInputProps } from './SearchInput';

export default {
  component: SearchInput,
  title: 'UI/SearchInput',
  argTypes: {
    onChange: {
      type: 'function',
      action: 'typed on input'
    }
  }
} as Meta;

const SearchInputStory: Story<SearchInputProps> = (args) => <SearchInput {...args} />;

export const SearchInputDefault = SearchInputStory.bind({});
SearchInputDefault.args = {
  debounceDelay: 500,
  disabled: false,
  placeholder: 'Storybook input'
};

SearchInputDefault.decorators = [
  (Component) => (
    <div style={{ padding: '12px', width: '80%', margin: '0 auto' }}>
      <Component />
    </div>
  )
];
