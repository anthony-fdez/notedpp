import React from 'react';
import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';

import MainLayout from './components/layout/mainLayout/mainLayout';
import Dashboard from './pages/dashboard/dashboard';
import AppBroke from './pages/errors/appBroke/appBroke';
import NotFound from './pages/errors/notFound/notFound';
import Home from './pages/home/home';
import Shared from './pages/shared/shared';

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
      path: '/shared/:note',
      errorElement: <AppBroke />,
      element: <Shared />,
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
