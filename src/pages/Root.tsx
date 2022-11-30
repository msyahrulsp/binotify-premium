import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import HomePage from './HomePage';

const Root = () => {
  const { pathname, state } = useLocation();

  return (
    <Flex minH='full'>
      <Sidebar />
      <Flex
        flexGrow={1}
        justifyContent='flex-start'
        flexDirection='column'
        pt={8}
        px={8}
      >
        {pathname === '/' ? <HomePage /> : <Outlet />}
      </Flex>
    </Flex>
  );
};

export default Root;
