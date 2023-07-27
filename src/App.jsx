import { useState } from 'react'
import Security from './components/Security/Security'
import CipherProvider from './components/store/CipherProvider'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <CipherProvider>
      <Security />
    </CipherProvider>
  )
}

export default App
