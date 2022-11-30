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
    <Center>
      <Stack w='370px' px='3'>
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
            <Link color='blue' href='/register'>
              Register an account
            </Link>
          </Text>
          <Button colorScheme='teal' mt='2' type='submit'>
            Login
          </Button>
        </form>
      </Stack>
    </Center>
  );
};

export default Login;
