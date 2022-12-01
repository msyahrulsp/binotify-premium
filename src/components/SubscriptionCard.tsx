import { Box, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { MdQuestionAnswer } from 'react-icons/md';
import { ISubscription } from '../@types/api';
import { ActionModal } from './Modal/ActionModal';

export const SubscriptionCard = ({
  creator_id,
  creator_name,
  subscriber_id,
  handleUpdate
}: ISubscription) => {
  return (
    <Container
      display='flex'
      flexDirection='row'
      gap={5}
      borderRadius='lg'
      p={4}
      boxShadow='4px 5px 5px -2px rgba(0,0,0,0.75)'
      alignItems='center'
      maxW='500px'
      background='hsla(0,0%,100%,.1)'
      justifyContent='space-between'
      flexWrap='wrap'
      border='1px solid #000'
    >
      <VStack alignItems='flex-start'>
        <HStack>
          <Text as='b' w='60px'>
            Singer
          </Text>
          <Text>{creator_name}</Text>
        </HStack>
        <HStack>
          <Text as='b' w='60px'>
            User ID
          </Text>
          <Text>{subscriber_id}</Text>
        </HStack>
      </VStack>
      <Box>
        <ActionModal
          creator_id={creator_id}
          subscriber_id={subscriber_id}
          handleUpdate={handleUpdate}
        >
          <Button
            colorScheme='green'
            size={{ base: 'sm', sm: 'md' }}
            leftIcon={<MdQuestionAnswer />}
          >
            Aksi
          </Button>
        </ActionModal>
      </Box>
    </Container>
  );
};
