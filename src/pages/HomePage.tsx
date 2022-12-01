import { Button, Flex, Image, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

import SpotifyGIF from '../assets/spotify.gif';
import { useNavigate } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection={{ base: 'column', lg: 'row' }}
      justifyContent='center'
      alignItems='center'
      minH={{ base: 'fit-content', lg: '80vh' }}
      gap={{ base: 5, lg: 20 }}
    >
      <Tooltip label='Yes, no budget gif' fontSize='md' offset={[0, 35]}>
        <Image
          userSelect='none'
          boxSize={{ base: '250px', lg: '500px' }}
          objectFit='cover'
          src={SpotifyGIF}
          alt='logo'
          borderRadius='lg'
          onClick={() =>
            window.open('http://localhost:3001/index.php', '_blank')
          }
          cursor='pointer'
          transition='all 0.25s ease-in-out'
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.5)'
          }}
        />
      </Tooltip>
      {!user ? (
        <VStack spacing={{ base: 6, lg: 10 }}>
          <Text
            w={{ base: '90%', lg: '200px' }}
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize='xl'
          >
            <strong>Binotify</strong> adalah sebuah website luar biasa saja yang
            dikerjakan oleh 3 mahasiswa relatif stress yang berfungsi sebagai
            pemutar lagu (walaupun Spotify lebih bagus) untuk memenuhi salah
            satu Tugas Besar pada mata kuliah Web Based Development
          </Text>
          <Button
            w={{ base: '90%', lg: '200px' }}
            colorScheme='green'
            size='lg'
            onClick={() => navigate(`/login`)}
          >
            Login&nbsp;
            <BiRightArrowAlt size={25} />
          </Button>
        </VStack>
      ) : user.isAdmin ? (
        <VStack spacing={{ base: 6, lg: 10 }}>
          <Text
            w={{ base: '90%', lg: '200px' }}
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize='xl'
          >
            Halo <strong>{user.name}</strong>! Selamat datang di{' '}
            <strong>Premium</strong>! Jangan lupa gawe ya 😊
          </Text>
          <Button
            w={{ base: '90%', lg: '200px' }}
            colorScheme='green'
            size='lg'
            onClick={() => navigate(`/subscription`)}
          >
            Lihat Subscription&nbsp;
            <BiRightArrowAlt size={25} />
          </Button>
        </VStack>
      ) : (
        <VStack spacing={{ base: 6, lg: 10 }}>
          <Text
            w={{ base: '90%', lg: '200px' }}
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize='xl'
          >
            Halo <strong>{user.name}</strong>! Lama kita tidak berjumpa.
            Dengan&nbsp;
            <strong>Premium</strong>, kamu bisa mengatur lagumu sendiri lho.
            Jadi, jangan lupa untuk dicoba ya!
          </Text>
          <Button
            w={{ base: '90%', lg: '200px' }}
            colorScheme='green'
            size='lg'
            onClick={() => navigate(`/singer/${user.user_id}/songs`)}
          >
            Lihat Lagumu&nbsp;
            <BiRightArrowAlt size={25} />
          </Button>
        </VStack>
      )}
    </Flex>
  );
};

export default HomePage;
