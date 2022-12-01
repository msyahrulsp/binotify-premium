import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  useToast
} from '@chakra-ui/react';
import { PasswordInput } from './Register';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [userCred, setUserCred] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, user } = useAuth();

  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload = {
      user: userCred,
      password: password
    };

    try {
      await login(payload);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = 'Login - Binotify Premium';
    if (user !== null) {
      navigate('/');
      toast({
        title: 'Warning',
        description: 'Kamu sudah login',
        status: 'warning',
        position: 'top',
        isClosable: true
      });
    }
  }, [user]);

  return (
    <Center
      minH='100vh'
      background='linear-gradient(to bottom, #87be8e, #1a1a1a)'
      color='white'
    >
      <Stack
        mt={-20}
        background='rgba(0, 0, 0, 0.85)'
        px={10}
        pb={10}
        borderRadius='lg'
      >
        <form onSubmit={handleLogin}>
          <Flex direction='column' gap='3' pt='10'>
            <Heading textAlign='center'>Binotify</Heading>
            <FormControl>
              <FormLabel>Email / Username</FormLabel>
              <Input
                type='text'
                onChange={(e: any) => setUserCred(e.target.value)}
              />
            </FormControl>
            <PasswordInput
              label='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
          <Text fontStyle='italic' fontSize='sm'>
            Don't have an account?{' '}
            <Link
              color='#CAC1B4'
              href='/register'
              textUnderlineOffset={4}
              textDecoration='underline'
              _hover={{ color: 'white' }}
            >
              Register an account
            </Link>
          </Text>
          <Button colorScheme='teal' mt='8' type='submit' w='100%'>
            Login
          </Button>
        </form>
      </Stack>
    </Center>
  );
};

export default Login;
