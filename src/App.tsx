import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routing } from './routing';
import { AppContext } from './context/AppContext';
import { IUser } from './@types/user';
import { theme } from './util/theme';

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const router = createBrowserRouter(Routing);

  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
