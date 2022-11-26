import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const Notification = ({ message }) => {
  if (message) {
    return (
      <Alert status="success" mb={2}>
        <AlertIcon />
          {message}
      </Alert>
    )
  } else {
    return null
  }
}

export default Notification
