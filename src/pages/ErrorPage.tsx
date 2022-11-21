import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <Flex alignItems='center' flexDirection='column' justifyContent='center' mt={20}>
      <Text fontSize="2xl">An unexpected error has occurred.</Text>
      <Text>
        <i>{error.statusText || error.message}</i>
      </Text>
    </Flex>
  )
}

export default ErrorPage
