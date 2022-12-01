import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react';
import { ReactNode, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { AppContextProps } from '../../@types/context';
import { uploadFile } from '../../util/helper';

const EditSongModal = ({
  title,
  path,
  songid,
  saveSongToDB,
  children
}: {
  title: string;
  path: string;
  songid: string;
  saveSongToDB: (
    title: string,
    path: string,
    singerid: any,
    songid: any
  ) => Promise<void>;
  children: ReactNode;
}) => {
  const { singerid } = useParams();

  const [songTitle, setSongTitle] = useState(title);
  const [songPath, setSongPath] = useState(path);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { message, setMessageContent } = useContext(
    AppContext
  ) as AppContextProps;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSongTitle = (event: any) => {
    setSongTitle(event.target.value);
  };

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
    setLoading(true);

    const file = e.target[1].files[0];

    if (file) {
      const fileDate = file.lastModifiedDate.toISOString();
      uploadFile(file, fileDate, setProgress).then((songPath: any) => {
        setSongPath(songPath);
        setMessageContent('Lagu telah diperbarui.');
        saveSongToDB(songTitle, songPath, singerid, songid);
      });
    } else {
      setMessageContent('Lagu telah diperbarui.');
      saveSongToDB(songTitle, songPath, singerid, songid);
    }
    setLoading(false);
    onClose();
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
          <ModalHeader textAlign='center'>Edit Lagu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexGrow={1}
              justifyContent='flex-start'
              flexDirection='column'
              pb={4}
            >
              <form onSubmit={handleSubmit}>
                <VStack gap={2} alignItems='flex-start'>
                  <FormControl>
                    <FormLabel>Judul</FormLabel>
                    <Input
                      type='text'
                      value={songTitle ? songTitle : ''}
                      onChange={handleSongTitle}
                      variant='flushed'
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Song File</FormLabel>
                    <Input type='file' variant='flushed' accept='audio/*' />
                  </FormControl>
                  {progress === 0 ? null : <Text>Uploading {progress}%</Text>}
                  <Button
                    colorScheme='teal'
                    size='sm'
                    type='submit'
                    w='100%'
                    disabled={loading}
                  >
                    Save
                  </Button>
                </VStack>
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSongModal;
