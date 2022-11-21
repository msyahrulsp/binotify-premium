import { Outlet } from 'react-router-dom'
import React from 'react'
import { Flex, VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <Flex minH="100vh">
      <VStack bgColor="blackAlpha.900" color="white" minW="40">
        <div>sidebar</div>
      </VStack>
      <Flex
        flexGrow={1}
        justifyContent="flex-start"
        flexDirection="column"
        pt={8}
        px={8}
      >
        <Outlet />
      </Flex>
    </Flex>
  )
}

export default Home
