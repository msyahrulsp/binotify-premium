import { Outlet, useLocation } from 'react-router-dom'
import React from 'react'
import { Flex, VStack } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import HomePage from './HomePage'

const Root = () => {
  const { pathname, state } = useLocation();
  console.log('location', pathname)

  return (
    <Flex minH="100vh">
      <VStack bgColor="blackAlpha.900" color="white" minW="40">
        <Sidebar/>
      </VStack>
      <Flex
        flexGrow={1}
        justifyContent="flex-start"
        flexDirection="column"
        pt={8}
        px={8}
      >
        <p>{state}</p>
        {pathname === '/' ? <HomePage/> : <Outlet />}
      </Flex>
    </Flex>
  )
}

export default Root
