import React, {useState, useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Navbar from './Navbar'



const LoginForm = () => {
  const navigate = useNavigate()
  const[isLogin, setIsLogin] = useState({
    email:'',
    password:''
  })

  const handleOnChange = (e)=>{
     const {name, value} = e.target
     setIsLogin((prev) =>({
      ...prev,[name]:value
     }))
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    const prevData = JSON.parse(localStorage.getItem("users")) || []
    const validUser = prevData.find(user => user.email === isLogin.email && user.password === isLogin.password)
    if(validUser){
      navigate('/home')
    }else{
      alert("Invalid email or password")
    }
    setIsLogin({
      email:'',
      password:''
    })
  }
  return (
    <div>
       <Navbar/>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" onSubmit={handleSubmit}>
    
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input 
          onChange={handleOnChange}
          value={isLogin.email}
          type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input
          onChange={handleOnChange} 
          value={isLogin.password}
          type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-gray-500">
      If you don't have Account
      <Link to='/signup' href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">SignUp</Link>
    </p>
  </div>
</div>
    </div>
  )
}

export default LoginForm
