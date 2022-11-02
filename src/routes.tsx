import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/mainLayout/mainLayout';

const Collaborate = lazy(() => import('./pages/collaborate/collaborate'));
const Dashboard = lazy(() => import('./pages/dashboard/dashboard'));
const AppBroke = lazy(() => import('./pages/errors/appBroke/appBroke'));
const NotFound = lazy(() => import('./pages/errors/notFound/notFound'));
const LoginRequired = lazy(() => import('./pages/loginRequired/loginRequired'));
const Shared = lazy(() => import('./pages/shared/shared'));
const Home = lazy(() => import('./pages/home/home'));

interface Props {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const routes = ({ isAuthenticated, isLoading }: Props) => {
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
      path: '/login-required',
      errorElement: <AppBroke />,
      element: !isAuthenticated ? (
        <LoginRequired />
      ) : (
        <Navigate to='/dashboard' />
      ),
    },
    {
      path: '/collaborate/:note',
      errorElement: <AppBroke />,
      element:
        isAuthenticated || isLoading ? (
          <MainLayout>
            <Collaborate />
          </MainLayout>
        ) : (
          <Navigate to='/login-required' />
        ),
    },
    {
      path: '/dashboard',
      errorElement: <AppBroke />,
      element:
        isAuthenticated || isLoading ? (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        ) : (
          <Navigate to='/login-required' />
        ),
    },
  ]);

  return router;
};
