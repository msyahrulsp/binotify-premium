import { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Routing } from './routing'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            {Routing.map((route) => {
              const Component = route.component
              const props = route.props ? route.props : {}
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Component {...props} />}
                />
              )
            })}
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
  )
}

export default App
