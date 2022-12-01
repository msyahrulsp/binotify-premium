import { Box, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { MdQuestionAnswer } from 'react-icons/md';
import { ConfirmModal } from './Modal';

export const SubscriptionCard = () => {
  const a = 1;
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
      background='hsla(0,0%,100%,.3)'
      justifyContent='space-between'
      flexWrap='wrap'
    >
      <VStack alignItems='flex-start'>
        <HStack>
          <Text as='b' w='60px'>
            Singer
          </Text>
          <Text>username</Text>
        </HStack>
        <HStack>
          <Text as='b' w='60px'>
            User
          </Text>
          <Text>email</Text>
        </HStack>
      </VStack>
      <Box>
        <ConfirmModal>
          <Button
            colorScheme='green'
            size={{ base: 'sm', sm: 'md' }}
            leftIcon={<MdQuestionAnswer />}
          >
            Aksi
          </Button>
        </ConfirmModal>
      </Box>
    </Container>
  );
};
