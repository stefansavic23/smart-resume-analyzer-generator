import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ResumeUpload from './components/ResumeUpload.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import RegisterLogin from './components/RegisterLogin.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/login", element: <RegisterLogin title="Login" action="/login" btn="Login" />},
  {path: "/register", element: <RegisterLogin title="Register" action="/register" btn="Register" />},
  {path: "/analyze-resume", element: <ResumeUpload />},
  {path: "*", element: <NotFoundPage />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
