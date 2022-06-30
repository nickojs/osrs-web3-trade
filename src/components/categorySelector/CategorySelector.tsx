import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { categories } from '../../services/endpoints';

const categoriesObj = categories();

export interface CategorySelectorProps {
  onChange: (value: number) => void;
}

export default ({ onChange }: CategorySelectorProps) => {
  const { data } = useQuery('categories', () => api(categoriesObj));

  return (
    <select onChange={(e) => onChange(parseInt(e.target.value, 10))}>
      <option>Select one</option>
      {data && data.data.map((d: any) => (
        <option key={d.id} value={d.id}>{d.data}</option>
      ))}
    </select>
    );
};
