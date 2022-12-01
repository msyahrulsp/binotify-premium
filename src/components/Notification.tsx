import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';

const Notification = ({ message }: { message: string }) => {
  if (message) {
    return (
      <Alert status='info' mb={2}>
        <AlertIcon />
        {message}
      </Alert>
    );
  } else {
    return null;
  }
};

export default Notification;
