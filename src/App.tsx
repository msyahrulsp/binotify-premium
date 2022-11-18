import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Routing } from './routing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {Routing.map((route) => {
            const Component = route.component;
            const props = route.props ? route.props : {};
            return (
              <Route key={route.path} path={route.path} element={<Component {...props} />}/>
            )
          })}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
