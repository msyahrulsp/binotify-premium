import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routing } from './routing';
import { AppContext } from './context/AppContext';
import { IUser } from './@types/user';

const App = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<IUser | null>(null);

  const router = createBrowserRouter(Routing);

  const setMessageContent = (val: string) => {
    setMessage(val);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <ChakraProvider>
      <AppContext.Provider
        value={{ message, setMessageContent, user, setUser }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
