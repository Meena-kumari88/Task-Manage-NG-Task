
import './App.css'
import Home from './components/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RegisterationForm from './components/RegisterationForm'
import LoginForm from './components/LoginForm'
import LandingPage from './components/LandingPage'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedInStatus);

  },[])


  return (
    <>
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/signUp' element={<RegisterationForm/>}/>
      <Route path='/login' element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}/>
      <Route path ='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
