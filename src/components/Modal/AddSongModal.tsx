import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  useToast
} from '@chakra-ui/react';
import { ReactNode, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContextProps } from '../../@types/context';
import { AppContext } from '../../context/AppContext';
import { uploadFile } from '../../util/helper';

const AddSongModal = ({
  addSongToDB,
  children
}: {
  addSongToDB: (title: string, path: string, singerid: any) => Promise<void>;
  children: ReactNode;
}) => {
  const { message, setMessageContent } = useContext(
    AppContext
  ) as AppContextProps;
  const { singerid } = useParams();
  const [songTitle, setSongTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!songTitle) {
      toast({
        title: 'Error',
        status: 'error',
        description: 'Judul tidak boleh kosong',
        position: 'top',
        isClosable: true
      });
      return;
    }
    if (!e.target[1].files[0]) {
      toast({
        title: 'Error',
        status: 'error',
        description: 'File lagu tidak boleh kosong',
        position: 'top',
        isClosable: true
      });
      return;
    }
    setLoading(true);

    const file = e.target[1].files[0];
    const fileDate = file.lastModifiedDate.toISOString();

    uploadFile(file, fileDate, setProgress).then((songPath: any) => {
      addSongToDB(songTitle, songPath, singerid);
      setMessageContent('Lagu baru berhasil ditambahkan.');
      setSongTitle('');
      e.target.reset();
      setLoading(false);
      onClose();
    });
  };

  return (
    <>
      <Flex onClick={onOpen} flex={1}>
        {children}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          background='gray'
          color='white'
          boxShadow='4px 5px 5px -2px rgba(0,0,0,0.75)'
        >
          <ModalHeader textAlign='center'>Tambah Lagu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack gap={2} alignItems='flex-start' mb={4}>
                <FormControl>
                  <FormLabel>Judul</FormLabel>
                  <Input
                    type='text'
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    variant='flushed'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Song File</FormLabel>
                  <Input
                    type='file'
                    id='songFile'
                    accept='audio/*'
                    variant='flushed'
                  />
                </FormControl>
                {progress === 0 ? null : <Text>Uploading {progress}%</Text>}
                <Button
                  colorScheme='teal'
                  size='sm'
                  type='submit'
                  w='100%'
                  mt={4}
                  boxShadow='4px 5px 5px -2px rgba(0,0,0,0.75)'
                  disabled={loading}
                >
                  Add
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSongModal;
