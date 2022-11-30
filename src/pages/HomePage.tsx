import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';

import SpotifyGIF from '../assets/spotify.gif';
import { useNavigate } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      minH='80vh'
      gap={20}
    >
      <Image
        userSelect='none'
        boxSize='500px'
        objectFit='cover'
        src={SpotifyGIF}
        alt='logo'
        borderRadius='lg'
        onClick={() => window.open('http://localhost:3001/index.php', '_blank')}
        cursor='pointer'
        boxShadow='dark-lg'
      />
      {!user ? (
        <VStack spacing={10}>
          <Text w='400px' fontSize='xl'>
            <strong>Binotify</strong> adalah sebuah website luar biasa saja yang
            dikerjakan oleh 3 mahasiswa relatif stress yang berfungsi sebagai
            pemutar lagu (walaupun Spotify lebih bagus) untuk memenuhi salah
            satu Tugas Besar pada mata kuliah Web Based Development
          </Text>
          <Button
            w='400px'
            mt={8}
            colorScheme='green'
            size='lg'
            onClick={() => navigate(`/login`)}
          >
            Login&nbsp;
            <BiRightArrowAlt size={25} />
          </Button>
        </VStack>
      ) : user.isAdmin ? (
        <VStack spacing={10}>
          <Text w='400px' fontSize='xl'>
            Halo Admin, selamat datang di <strong>Premium</strong>! Jangan lupa
            gawe lho ya
          </Text>
          <Button
            w='400px'
            mt={8}
            colorScheme='green'
            size='lg'
            onClick={() => navigate(`/subscription`)}
          >
            Lihat Subscription&nbsp;
            <BiRightArrowAlt size={25} />
          </Button>
        </VStack>
      ) : (
        <VStack spacing={10}>
          <Text w='400px' fontSize='xl'>
            Halo <strong>{user.name}</strong>! Lama kita tidak berjumpa.
            Dengan&nbsp;
            <strong>Premium</strong>, kamu bisa mengatur lagumu sendiri lho.
            Jadi, jangan lupa untuk dicoba ya!
          </Text>
          <Button
            w='400px'
            mt={8}
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
