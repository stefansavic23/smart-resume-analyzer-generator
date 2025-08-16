import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterLogin from './components/RegisterLogin.jsx'

function App() {
  return (
    <RegisterLogin title="Login" action="/login" btn="Login" />
  )
}

export default App
