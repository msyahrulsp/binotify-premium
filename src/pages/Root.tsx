import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import HomePage from './HomePage';

const Root = () => {
  const { pathname, state } = useLocation();

  return (
    <Flex minH='100vh' position='relative'>
      <VStack
        position='fixed'
        top={0}
        left={0}
        bgColor='black'
        color='white'
        minW='40'
        h='full'
      >
        <Sidebar />
      </VStack>
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
