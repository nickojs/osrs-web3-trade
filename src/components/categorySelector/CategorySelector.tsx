import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { categories } from '../../services/endpoints';

const categoriesObj = categories();

export default () => {
  const { data } = useQuery('categories', () => api(categoriesObj));

  return (
    <select>
      <option>Select one</option>
      {data && data.data.map((d: any) => (
        <option key={d.id} id={d.id}>{d.data}</option>
      ))}
    </select>
    );
};
