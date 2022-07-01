import React from 'react';
import { Search } from './styles';

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder: string;
}

export default ({ onChange, placeholder, disabled }: SearchProps) => (
  <Search
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    disabled={disabled}
  />
);
