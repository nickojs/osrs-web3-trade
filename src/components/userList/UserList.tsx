import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { searchUsers } from '../../services/endpoints';

type UserStatus = 'online' | 'away' | 'busy'

interface User {
  userId: string;
  username: string;
  picture: string;
  status: UserStatus
}

const searchUsersParams = searchUsers();

export default () => {
  const [userList, setUserList] = useState<User[]>([]);

  const { data, error } = useQuery('items', () => api(searchUsersParams));

  useEffect(() => {
    if (data) setUserList(data.data);
  }, [data]);

  return (
    <div>
      code stuff
      {userList && userList.map((user) => (
        <p>{JSON.stringify(user)}</p>
      ))}
      {error && <p>{JSON.stringify(error)}</p>}
    </div>
  );
};
