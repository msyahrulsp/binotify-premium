import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
  Button,
  ModalCloseButton,
  HStack,
  useToast
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { StatusUpdate } from '../pages/SubscriptionPage';

export const ActionModal = ({
  children,
  creator_id,
  subscriber_id,
  handleUpdate
}: {
  children: ReactNode;
  creator_id: number;
  subscriber_id: number;
  handleUpdate: (
    creator_id: number,
    subscriber_id: number,
    status: string
  ) => Promise<void>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  return (
    <>
      <Flex color='red' onClick={onOpen} flex={1}>
        {children}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          background='gray'
          color='white'
          boxShadow='4px 5px 5px -2px rgba(0,0,0,0.75)'
        >
          <ModalHeader textAlign='center'>Handle Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack alignItems='center' spacing={4} justifyContent='center'>
              <Button
                w='100%'
                bg='red'
                color='#FFFFFF'
                boxShadow='4px 5px 5px -2px rgba(0,0,0,0.75)'
                onClick={() => {
                  handleUpdate(creator_id, subscriber_id, StatusUpdate.REJECT);
                  onClose();
                }}
                _hover={{
                  opacity: 0.5
                }}
              >
                Reject
              </Button>
              <Button
                w='100%'
                bg='green'
                color='#FFFFFF'
                boxShadow='4px 5px 5px -2px rgba(0,0,0,0.75)'
                onClick={() => {
                  handleUpdate(creator_id, subscriber_id, StatusUpdate.ACCEPT);
                  onClose();
                }}
                _hover={{
                  opacity: 0.5
                }}
              >
                Accept
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
