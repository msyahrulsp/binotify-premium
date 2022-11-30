import { useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContextProps } from '../@types/context';
import { AppContext } from '../context/AppContext';
import { AuthResponse, useAuth } from './useAuth';

export enum Access {
  ADMIN = 'ADMIN',
  SINGER = 'SINGER'
}

export const useRole = (access: Access) => {
  const toast = useToast();
  const navigate = useNavigate();
  const isAdmin = access === Access.ADMIN;
  const { user } = useContext(AppContext) as AppContextProps;
  const { logout, validateToken } = useAuth();
  const [haveAccess, setHaveAccess] = useState(false);

  const checkRole = async () => {
    const validate = await validateToken();
    if (validate !== AuthResponse.VALID_TOKEN) {
      navigate('/login');
      logout();

      toast({
        title: 'Error',
        description:
          validate === AuthResponse.NO_TOKEN
            ? 'Kamu belum login'
            : 'Sesi invalid. Silahkan login kembali',
        status: 'error',
        position: 'top',
        isClosable: true
      });
      return;
    }

    if (user?.isAdmin !== isAdmin) {
      navigate('/');
      toast({
        title: 'Error',
        description: 'Kamu tidak memiliki akses',
        status: 'error',
        position: 'top',
        isClosable: true
      });
      return;
    }

    setHaveAccess(true);
  };

  useEffect(() => {
    checkRole();
  }, []);

  return { haveAccess };
};
