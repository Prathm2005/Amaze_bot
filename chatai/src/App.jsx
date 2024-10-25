import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/main/Main'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function App() {
  return (
    <>
    <Sidebar/>
    <Main/> 
    </>
  )
}

export default App