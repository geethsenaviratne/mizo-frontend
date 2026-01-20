import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/signupPage'
import AdminHomePage from './pages/adminHomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgotPasswordPage from './pages/forgot-password'


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
     <BrowserRouter>
     <Toaster/>
     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

     <Routes paths = "/*">

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  
  {/* Admin routes */}
  <Route path="/admin/*" element={<AdminHomePage />} />


    <Route path = "/*" element = {<HomePage/>}/>
    
     </Routes>
    </GoogleOAuthProvider>
     </BrowserRouter>
    </>
  )
}

export default App
