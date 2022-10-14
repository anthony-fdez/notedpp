import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/mainLayout/mainLayout';
import Dashboard from './pages/dashboard/dashboard';
import AppBroke from './pages/errors/appBroke/appBroke';
import NotFound from './pages/errors/notFound/notFound';
import Home from './pages/home/home';

interface Props {
  isAuthenticated: boolean;
}

export const routes = ({ isAuthenticated }: Props) => {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/',
      errorElement: <AppBroke />,
      element: !isAuthenticated ? <Home /> : <Navigate to='/dashboard' />,
    },
    {
      path: '/dashboard',
      errorElement: <AppBroke />,
      element: isAuthenticated ? (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      ) : (
        <Navigate to='/' />
      ),
    },
  ]);

  return router;
};
