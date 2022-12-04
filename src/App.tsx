import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import './App.css'
import Login from './form/Login'

import awsExports from './aws-exports';
Amplify.configure(awsExports);
function App() {

  return (
    <div className="App">

      <Authenticator>
        {({ signOut, user }) => (

          <BrowserRouter>          
            <Navbar />
            <Login />
            <div className="pages">
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
            </div>
            <button onClick={signOut}>Sign out</button>
          </BrowserRouter>

        )}
      </Authenticator>

    </div>
  )
}

export default App
