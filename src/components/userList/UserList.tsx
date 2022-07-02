import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { searchUsers } from '../../services/endpoints';
import SearchInput from '../UI/input/SearchInput';
import Loader from '../UI/loader/Loader';
import {
  Container,
  IdSpan,
  UserContainer, UserDataContainer, UserList
} from './styles';

export type UserStatus = 'online' | 'away' | 'busy'

interface User {
  id: string;
  username: string;
  picture: string;
  status: UserStatus
}

export default () => {
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState<User[]>([]);
  const [params, setParams] = useState({});
  const { data, error, isLoading } = useQuery(['items', params], () => api(params), { enabled: Object.keys(params).length > 0 });

  const searchHandler = (value: string) => setSearch(value);

  useEffect(() => {
    if (data) setUserList(data.data);
  }, [data]);

  useEffect(() => {
    if (search) {
      const searchUsersParams = searchUsers(search);
      setParams(searchUsersParams);
    }
  }, [search]);

  return (
    <Container>
      <p>User List</p>
      <SearchInput
        onChange={(e) => searchHandler(e.target.value)}
        placeholder="Locate user"
        disabled={isLoading}
      />
      {userList && (
        <UserList>
          {userList.map((user) => (
            <UserContainer status={user.status || 'online'}>
              {/* <UserProfilePic src={user.picture} alt="profile pic" /> */}
              <UserDataContainer>
                <IdSpan>
                  {user.id.substring(0, 12)}
                  ...
                </IdSpan>
                <span>{user.username}</span>
              </UserDataContainer>
            </UserContainer>
          ))}
          {error && <p>{JSON.stringify(error)}</p>}
        </UserList>
      )}

      {isLoading && (<Loader />)}
    </Container>
  );
};
