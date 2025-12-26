import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/signupPage'
import AdminHomePage from './pages/adminHomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>

     <Routes paths = "/*">

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
  
  {/* Admin routes */}
  <Route path="/admin/*" element={<AdminHomePage />} />


    <Route path = "/*" element = {<HomePage/>}/>
    
     </Routes>
  
     </BrowserRouter>
    </>
  )
}

export default App
