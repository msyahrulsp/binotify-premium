import { Box } from '@chakra-ui/react';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Box w='100%' h={2}>
      <Box
        transition='all 0.2s ease-in-out'
        h='100%'
        w={`${progress}%`}
        bgColor='rgba(56,161,105,0.65)'
        borderRightRadius='lg'
        mb={2}
      />
    </Box>
  );
};

export default ProgressBar;
