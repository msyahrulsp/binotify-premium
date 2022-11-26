import { ChakraProvider } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Routing } from './routing'

export const MessageContext = React.createContext(null)
const router = createBrowserRouter(Routing)

const App = () => {
  const [message, setMessage] = useState('')

  const setMessageContent = (val) => {
    setMessage(val)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <ChakraProvider>
      <MessageContext.Provider value={{ message, setMessageContent }}>
        <RouterProvider router={router} />
      </MessageContext.Provider>
    </ChakraProvider>
  )
}

export default App
