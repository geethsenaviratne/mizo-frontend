import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCart from './components/productCart'
import User from './components/user'
import Testing from './components/testing'
import LoginPage from './pages/loginPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>

     <Routes paths = "/*">

     <Route path = "/" element = {<LoginPage/>}/>
     <Route path = "/home" element = {<HomePage/>}/>

    <Route path = "/*" element = {<h1> 404 ERROR Page Not Found</h1>}/>
    
     </Routes>
  
     </BrowserRouter>
    </>
  )
}

export default App
