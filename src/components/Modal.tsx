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
  HStack
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export const ConfirmModal = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex color='red' onClick={onOpen} flex={1}>
        {children}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent background='gray' color='white'>
          <ModalHeader textAlign='center'>Handle Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack alignItems='center' spacing={4} justifyContent='center'>
              <Button
                w='100%'
                bg='red'
                color='#FFFFFF'
                onClick={onClose}
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
                onClick={onClose}
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
