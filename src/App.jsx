import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Navbar name={false} />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="dashboard" element={<h1>Account</h1>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
