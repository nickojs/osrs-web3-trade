import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../Containers/Login';

const routes = (
  <Routes>
    <Route key="app" path="/app" element={<ProtectedRoute />} />
    <Route key="base" path="/" element={<Login />} />
  </Routes>
);

export default routes;
