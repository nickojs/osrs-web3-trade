import debounce from 'lodash.debounce';
import React from 'react';
import { Search } from './styles';

export interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  debounceDelay?: number;
}

export default ({
 onChange, placeholder, disabled, debounceDelay = 500
}: SearchInputProps) => {
  const debouncedSearchHandler = debounce(onChange, debounceDelay);

  return (
    <Search
      type="text"
      placeholder={placeholder}
      onChange={debouncedSearchHandler}
      disabled={disabled}
    />
  );
};
