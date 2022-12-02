import { useContext, useEffect, useState } from 'react';
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
  InputGroup,
  InputRightElement,
  useToast,
  FormErrorMessage
} from '@chakra-ui/react';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { postDataAPI } from '../../util/api';
import { AppContextProps } from '../../@types/context';
import { AppContext } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';

export const PasswordInput = ({
  label,
  isError,
  onChange
}: {
  label: string;
  isError: boolean;
  onChange: (e: any) => void;
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input type={show ? 'text' : 'password'} onChange={onChange} />
        <InputRightElement
          onClick={handleShow}
          children={
            show ? (
              <RiEyeCloseLine cursor='pointer' />
            ) : (
              <RiEyeLine cursor='pointer' />
            )
          }
        />
      </InputGroup>
      {isError ? (
        <FormErrorMessage>
          Password length should be more than 8 characters, alphanumerical, and
          contain's symbol
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = useContext(AppContext) as AppContextProps;
  const { user } = useAuth();

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailError =
    email.length > 0
      ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
        ? true
        : false
      : false;

  const isPasswordError =
    password.length > 0
      ? /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^.&*]{8,}$/.test(
          password
        ) === false
        ? true
        : false
      : false;

  const isPasswordConfirmError =
    confirmPassword.length > 0
      ? /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^.&*]{8,}$/.test(
          confirmPassword
        ) === false
        ? true
        : false
      : false;

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (isEmailError || isPasswordError || isPasswordConfirmError) {
      toast({
        title: 'Error',
        description: 'Email or Password not valid',
        status: 'error',
        position: 'top',
        isClosable: true
      });
      return;
    }
    const payload = {
      name,
      username,
      email,
      password,
      confirm_password: confirmPassword
    };
    try {
      const response = await postDataAPI('/auth/register', { payload });
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
    document.title = 'Register - Binotify Premium';
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
        <form onSubmit={handleRegister}>
          <Flex direction='column' w='360px' gap='3' pt='10'>
            <Heading textAlign='center'>Binotify</Heading>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input type='text' onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type='text'
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isInvalid={isEmailError}>
              <FormLabel>Email</FormLabel>
              <Input type='text' onChange={(e) => setEmail(e.target.value)} />
              {isEmailError ? (
                <FormErrorMessage>Invalid email.</FormErrorMessage>
              ) : null}
            </FormControl>
            <PasswordInput
              label='Password'
              isError={isPasswordError}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              label='ConfirmPassword'
              isError={isPasswordConfirmError}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Flex>
          <Text fontStyle='italic' fontSize='sm'>
            Already have an account?{' '}
            <Link
              color='#CAC1B4'
              href='/login'
              textUnderlineOffset={4}
              textDecoration='underline'
              _hover={{ color: 'white' }}
            >
              Log In
            </Link>
          </Text>
          <Button colorScheme='teal' mt='8' type='submit' w='100%'>
            Register
          </Button>
        </form>
      </Stack>
    </Center>
  );
};

export default Register;
