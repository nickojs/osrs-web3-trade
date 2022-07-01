import debounce from 'lodash.debounce';
import React from 'react';
import { Search } from './styles';

export interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder: string;
  debounceDelay: number;
}

export default ({
 onChange, placeholder, disabled, debounceDelay
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
