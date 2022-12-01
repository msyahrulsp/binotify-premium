import { Outlet, useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import HomePage from './HomePage';

const Root = () => {
  const { pathname } = useLocation();

  return (
    <Flex
      minH='100vh'
      background='linear-gradient(to bottom, #87be8e, #1a1a1a)'
      color='white'
      flexDirection={{ base: 'column-reverse', lg: 'row' }}
    >
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
