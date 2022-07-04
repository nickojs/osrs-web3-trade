import { useQuery } from 'react-query';
import React from 'react';
import { api } from '../../services/api';
import { categories } from '../../services/endpoints';

const categoriesObj = categories();

export interface CategorySelectorProps {
  onChange: (value: number) => void;
  disabled: boolean
}

export default ({ onChange, disabled }: CategorySelectorProps) => {
  const { data } = useQuery('categories', () => api(categoriesObj));

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <select
      onChange={(e) => onChangeHandler(e)}
      disabled={disabled}
    >
      <option>Select one</option>
      {data && data.data.map((d: any) => (
        <option key={d.id} value={d.id}>{d.data}</option>
      ))}
    </select>
    );
};
