import { useContext, useEffect, useState } from 'react';
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
import { AppContext } from '../../context/AppContext';
import { AppContextProps } from '../../@types/context';
import { postDataAPI } from '../../util/api';

const Login = () => {
  const navigate = useNavigate();
  const [userCred, setUserCred] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useContext(AppContext) as AppContextProps;
  const toast = useToast();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload = {
      user: userCred,
      password: password
    };
    try {
      const response = await postDataAPI('/auth/login', {
        payload
      });
      // TODO: handle pake hooks per page
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast({
        title: 'Success',
        description: response.message,
        status: 'success',
        position: 'top',
        isClosable: true
      });
      navigate('/');
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.response?.data.message ?? err.message,
        status: 'error',
        position: 'top',
        isClosable: true
      });
    }
  };

  useEffect(() => {
    document.title = 'Login - Binotify Premium';
  }, []);

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
