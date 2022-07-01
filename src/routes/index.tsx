import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../Containers/Login';
import Main from '../Containers/Main';

const routes = (
  <Routes>
    <Route
      key="app"
      path="/app"
      element={(
        <ProtectedRoute>
          <Main />
        </ProtectedRoute>
    )}
    />
    <Route key="base" path="/" element={<Login />} />
  </Routes>
);

export default routes;
