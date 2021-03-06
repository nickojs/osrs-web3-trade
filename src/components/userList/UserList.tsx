import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useSocket from '../../context/SocketContext';
import useToast, { ToastType } from '../../context/NotificationContext';
import profilepics from '../../constants/profilePic';
import { api } from '../../services/api';
import { searchUsers } from '../../services/endpoints';
import SearchInput from '../UI/input/SearchInput';
import Loader from '../UI/loader/Loader';
import {
  Container,
  IdSpan,
  UserContainer, UserDataContainer, UserList, UserProfilePic
} from './styles';

export type UserStatus = 'online' | 'away' | 'busy'

interface User {
  id: string;
  username: string;
  profilePicId: string;
  status: UserStatus
}

const getProfilePic = (id: number) => profilepics.find((p) => p.id === id)?.pic;

export default () => {
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState<User[]>([]);
  const [params, setParams] = useState({});
  const { data, error, isLoading } = useQuery(['items', params], () => api(params), { enabled: Object.keys(params).length > 0 });
  const { requestTrade } = useSocket();
  const { setToast } = useToast();

  const searchHandler = (value: string) => setSearch(value);

  const requestTradeHandler = (targetId: string, username: string) => {
    requestTrade(targetId);
    setToast({
      message: `requesting ${username}...`,
      type: ToastType.WARNING
    });
  };

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
          {userList.map((user) => {
            const profilePic = getProfilePic(parseInt(user.profilePicId, 10));
            return (
              <UserContainer
                key={user.id}
                status={user.status || 'online'}
                onClick={() => requestTradeHandler(user.id, user.username)}
              >
                {profilePic && <UserProfilePic src={profilePic} alt="profile pic" />}
                <UserDataContainer>
                  <IdSpan>
                    {user.id.substring(0, 12)}
                    ...
                  </IdSpan>
                  <span>{user.username}</span>
                </UserDataContainer>
              </UserContainer>
            );
          })}
          {error && <p>{JSON.stringify(error)}</p>}
        </UserList>
      )}

      {isLoading && (<Loader />)}
    </Container>
  );
};
