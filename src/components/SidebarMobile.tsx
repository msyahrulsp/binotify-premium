import { Link, useNavigate } from 'react-router-dom';
import { Flex, Text, useToast, VStack } from '@chakra-ui/react';
import { Access } from '../hooks/useRole';

import {
  MdOutlineDashboard,
  MdOutlineSubscriptions,
  MdFormatListBulleted,
  MdLogin,
  MdLogout
} from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';

const SidebarMobile = () => {
  const { user, logout } = useAuth();
  const role = user?.isAdmin ? Access.ADMIN : Access.SINGER;
  const toast = useToast();
  const navigate = useNavigate();

  const navItem = {
    ADMIN: [
      { path: '/', label: 'Dashboard', icon: <MdOutlineDashboard size={30} /> },
      {
        path: '/subscription',
        label: 'Subscription',
        icon: <MdOutlineSubscriptions size={30} />
      }
    ],
    SINGER: [
      { path: '/', label: 'Dashboard', icon: <MdOutlineDashboard size={30} /> },
      {
        path: `/singer/${user?.user_id}/songs`,
        label: 'Song List',
        icon: <MdFormatListBulleted size={30} />
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
    navigate('/');
  };

  return (
    <Flex
      py={4}
      bg='black'
      color='white'
      flexWrap='wrap'
      position='sticky'
      bottom={0}
      left={0}
      flexDirection='row'
      boxShadow='dark-lg'
      zIndex={100}
      marginTop={8}
      justifyContent='space-evenly'
      background='rgba(0, 0, 0, 0.85)'
    >
      {user !== null ? (
        <>
          {navItem[role].map((item, index) => {
            return (
              <Link to={item.path} key={index}>
                <VStack
                  spacing={0}
                  alignSelf='center'
                  _hover={{ opacity: 0.8 }}
                >
                  {item.icon}
                  <Text fontSize='10px'>{item.label}</Text>
                </VStack>
              </Link>
            );
          })}
          <VStack
            spacing={0}
            alignSelf='center'
            _hover={{ opacity: 0.8 }}
            onClick={handleLogout}
          >
            <MdLogout size={30} />
            <Text fontSize='10px'>Logout</Text>
          </VStack>
        </>
      ) : (
        <Link to='/login'>
          <VStack alignSelf='center' _hover={{ opacity: 0.8 }}>
            <MdLogin size={30} />
            <Text>Login</Text>
          </VStack>
        </Link>
      )}
    </Flex>
  );
};

export default SidebarMobile;
