import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterLogin from './components/RegisterLogin.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RegisterLogin title="Register" action="/register" btn="Register" />} />
      </Routes>
    </Router>
  )
}

export default App
