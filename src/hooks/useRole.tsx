import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthResponse, useAuth } from './useAuth';

export enum Access {
  ADMIN = 'ADMIN',
  SINGER = 'SINGER'
}

export const useRole = (access: Access) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { logout, validateToken } = useAuth();
  const [haveAccess, setHaveAccess] = useState(false);

  const checkRole = async () => {
    const validate = await validateToken();
    if (
      validate !== AuthResponse.ADMIN_TOKEN &&
      validate !== AuthResponse.SINGER_TOKEN
    ) {
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

    const tokenAccess = validate.split('_')[0];
    if (tokenAccess !== access) {
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
