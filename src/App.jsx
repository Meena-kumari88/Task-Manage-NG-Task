
import './App.css'
import Home from './components/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RegisterationForm from './components/RegisterationForm'
import LoginForm from './components/LoginForm'
import LandingPage from './components/LandingPage'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/signUp' element={<RegisterationForm/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path ='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
