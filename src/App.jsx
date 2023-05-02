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
  const [accountPrefs, setAccountPrefs] = useState({})

  const [theme, setTheme] = useState('dark')

  const setNewTheme = (theme) => {
    setTheme(theme);
    if (userAccount) {
      setAccountPrefs(accountPrefs.theme = theme)
      const promise = account.updatePrefs(
        accountPrefs
      );

      promise.then(function (response) {
          console.log(response); // Success
      }, function (error) {
          console.log(error); // Failure
      });
    }
  }

  useEffect(() => {
    const promise = account.getPrefs();

    promise.then(function (response) {
        // console.log(response); // Success
        setAccountPrefs(response);
        
        if (response.theme) {
          setTheme(response.theme)
        }
    }, function (error) {
        console.log(error); // Failure
    });
  }, [])

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
      <Navbar setTheme={setNewTheme} theme={theme} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage account={userAccount} theme={theme} />} />
          <Route path="dashboard" element={<AccountPage account={userAccount} setAccount={setUserAccount} theme={theme} />} />
          <Route path="login" element={<Login account={userAccount} setAccount={setUserAccount} theme={theme} />} />
          <Route path="register" element={<Register account={userAccount} setAccount={setUserAccount} theme={theme} />} />
          <Route path='/view/:pasteID' element={<PastePage theme={theme} />}></Route>
          {/* <Route path='/edit/:pasteID' element={<EditPaste />}></Route> */}
          <Route path="*" element={<NotFound theme={theme} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
