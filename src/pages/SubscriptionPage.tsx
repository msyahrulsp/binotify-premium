import { Flex, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Loading } from '../components/Loading';
import { SubscriptionCard } from '../components/SubscriptionCard';
import { Access, useRole } from '../hooks/useRole';

export const SubscriptionPage = () => {
  const { haveAccess } = useRole(Access.ADMIN);

  useEffect(() => {
    document.title = 'Subscription - Binotify Premium';
  }, []);

  if (!haveAccess) return <Loading />;
  // TODO: belum dipasang pagination

  return (
    <Flex minH='80vh' flexDirection='column' alignItems='center'>
      <Text as='b' fontSize='2xl'>
        Subscription List Request
      </Text>
      <VStack spacing={5} mt={5} w='100%'>
        {[...Array(10)].map((index) => {
          return <SubscriptionCard key={index} />;
        })}
      </VStack>
    </Flex>
  );
};
