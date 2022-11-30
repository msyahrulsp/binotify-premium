import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import { Access, useRole } from '../hooks/useRole';

export const SubscriptionPage = () => {
  const { haveAccess } = useRole(Access.ADMIN);

  useEffect(() => {
    document.title = 'Subscription - Binotify Premium';
  }, []);

  if (haveAccess) return <Loading />;

  return (
    <Flex
      mt={8}
      minH='100vh'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Text>Subscription Page</Text>
    </Flex>
  );
};
