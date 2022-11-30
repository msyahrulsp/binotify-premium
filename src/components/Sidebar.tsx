import { useContext } from 'react';
import { Link, matchPath } from 'react-router-dom';
import { Flex, HStack, Image, Text, useToast, VStack } from '@chakra-ui/react';
import { Access } from '../hooks/useRole';
import { AppContext } from '../context/AppContext';
import { AppContextProps } from '../@types/context';

import {
  MdOutlineDashboard,
  MdOutlineSubscriptions,
  MdFormatListBulleted,
  MdLogin,
  MdLogout
} from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { user } = useContext(AppContext) as AppContextProps;
  const { logout } = useAuth();
  const role = user?.isAdmin ? Access.ADMIN : Access.SINGER;
  const toast = useToast();

  const navItem = {
    ADMIN: [
      { path: '/', label: 'Dashboard', icon: <MdOutlineDashboard size={25} /> },
      {
        path: '/subscription',
        label: 'Subscription',
        icon: <MdOutlineSubscriptions size={25} />
      }
    ],
    SINGER: [
      { path: '/', label: 'Dashboard', icon: <MdOutlineDashboard size={25} /> },
      {
        path: `/songs`,
        label: 'Song List',
        icon: <MdFormatListBulleted size={25} />
      }
    ]
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Success',
      description: 'Berhasil logout',
      status: 'success',
      position: 'top',
      isClosable: true
    });
  };

  return (
    <Flex
      px={8}
      py={5}
      bg='black'
      color='white'
      flexWrap='wrap'
      position='sticky'
      top={0}
      left={0}
      alignSelf='flex-start'
      flexDirection='column'
      h='100vh'
      w='fit-content'
    >
      <Link to='/'>
        <HStack flexDirection='row'>
          <Image
            boxSize='50px'
            objectFit='cover'
            src='../../public/spotify.png'
            alt='logo'
          />
          <Text fontSize='xl' fontWeight='bold'>
            Premium
          </Text>
        </HStack>
      </Link>
      {user !== null ? (
        <Flex flexDirection='column'>
          <VStack mt={8} spacing={5} alignItems='flex-start'>
            {navItem[role].map((item) => {
              const location = window.location.pathname;
              const isMatch = matchPath({ path: item.path }, location);

              return (
                <Link to={item.path}>
                  <HStack
                    _hover={{
                      opacity: 0.8
                    }}
                    borderLeft={isMatch ? '5px solid #1DB954' : 'none'}
                    pl={isMatch ? 3 : 0}
                    transition='all 0.25s ease-in-out'
                  >
                    {item.icon}
                    <Text>{item.label}</Text>
                  </HStack>
                </Link>
              );
            })}
          </VStack>
          <HStack
            position='fixed'
            bottom={10}
            alignItems='center'
            _hover={{ opacity: 0.8 }}
            onClick={handleLogout}
            cursor='pointer'
          >
            <MdLogout size={25} />
            <Text>Logout</Text>
          </HStack>
        </Flex>
      ) : (
        <Link to='/login'>
          <HStack mt={8} alignItems='flex-start' _hover={{ opacity: 0.8 }}>
            <MdLogin size={25} />
            <Text>Login</Text>
          </HStack>
        </Link>
      )}
    </Flex>
  );
};

export default Sidebar;
