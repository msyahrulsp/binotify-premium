import { useToast } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContextProps } from '../@types/context';
import { IAuth } from '../@types/user';
import { AppContext } from '../context/AppContext';
import { postDataAPI } from '../util/api';

export enum AuthResponse {
  NO_TOKEN = 'NO_TOKEN',
  INVALID_TOKEN = 'INVALID',
  VALID_TOKEN = 'VALID'
}

export const useAuth = () => {
  const { user, setUser } = useContext(AppContext) as AppContextProps;
  const toast = useToast();
  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem('token') ?? null;
  };

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  const destroyToken = () => {
    localStorage.removeItem('token');
  };

  const logout = () => {
    setUser(null);
    destroyToken();
  };

  const validateToken = async () => {
    const token = getToken();
    const payload = {
      token
    };

    if (token) {
      try {
        const { data } = await postDataAPI('/auth/validate', {
          payload
        });
        setUser(data);
        return AuthResponse.VALID_TOKEN;
      } catch (err: any) {
        console.log(err);
        return AuthResponse.INVALID_TOKEN;
      }
    }
    return AuthResponse.NO_TOKEN;
  };

  const login = async (auth: IAuth) => {
    try {
      const response = await postDataAPI('/auth/login', {
        payload: auth
      });
      setToken(response.data.token);
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
    const checkUser = async () => {
      await validateToken();
    };

    checkUser();
  }, []);

  return { login, logout, user, validateToken };
};
