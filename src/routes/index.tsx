import { Route, Routes } from 'react-router-dom';
import Login from '../Containers/Login';
import Main from '../Containers/Main';

const routesArray = [
  {
    path: '/', name: 'Login', Component: Login, isProtected: false
  },
  {
    path: '/app', name: 'Login', Component: Main, isProtected: false
  }
];

const routes = (
  <Routes>
    {routesArray.map(({ Component, path }) => (
      <Route path={path} element={<Component />} />
    ))}
  </Routes>
);

export default routes;
