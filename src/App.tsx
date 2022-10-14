import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import BackdropSpinner from './components/backdrop/backdrop';
import { routes } from './routes';

function App() {
  const { isAuthenticated } = useAuth0();

  const router = routes({ isAuthenticated });

  return (
    <div className='App'>
      <BackdropSpinner />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
