import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'
import AccountPage from './pages/AccountPage'
import Login from './pages/Login'
import Register from './pages/Register'
import PastePage from './pages/PastePage'
// import EditPaste from './pages/EditPaste' // Need to implement in future


import { useState, useEffect } from 'react'

import { Client, Account } from "appwrite";

const client = new Client();

const account = new Account(client);

client
    .setEndpoint('https://obosoft.it:8056/v1') // Your API Endpoint
    .setProject('6441c6e7d6448edcc109') // Your project ID
;

function App() {
  // const [userAccount, setUserAccount] = useState(false)
  const [userAccount, setUserAccount] = useState(false)

  useEffect(() => {
    const promise = account.get();

    promise.then(function (response) {
      setUserAccount(response)
    }, function () { // Error
      setUserAccount(false)
    });
  }, [])

  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage account={userAccount} />} />
          <Route path="dashboard" element={<AccountPage account={userAccount} setAccount={setUserAccount} />} />
          <Route path="login" element={<Login account={userAccount} setAccount={setUserAccount} />} />
          <Route path="register" element={<Register account={userAccount} setAccount={setUserAccount} />} />
          <Route path='/view/:pasteID' element={<PastePage />}></Route>
          {/* <Route path='/edit/:pasteID' element={<EditPaste />}></Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
