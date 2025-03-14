import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'
import AccountPage from './pages/AccountPage'
import Login from './pages/Login'
import Register from './pages/Register'
import PastePage from './pages/PastePage'
import EditPaste from './pages/EditPaste'

import { useState } from 'react'

function App() {
  const [userAccount, setUserAccount] = useState(false)
  const [accountPrefs, setAccountPrefs] = useState({})

  const [theme, setTheme] = useState('dark')

  const setNewTheme = (theme) => {
    setTheme(theme);
    if (userAccount) {
      setAccountPrefs(accountPrefs.theme = theme)
    }
  }

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
          <Route path='/edit/:pasteID' element={<EditPaste theme={theme} />}></Route>
          <Route path="*" element={<NotFound theme={theme} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App