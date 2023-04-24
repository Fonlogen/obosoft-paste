import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="dashboard" element={<h1>Account</h1>} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
