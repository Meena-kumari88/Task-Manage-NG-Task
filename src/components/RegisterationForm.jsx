import React,{useState,useEffect} from 'react'
import Navbar from './Navbar';


const RegisterationForm = () => {
    const[userInfo, setUserInfo] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange =(e) =>{
      const {name, value} = e.target;
      setUserInfo((prev)=>({
        ...prev,[name]:value
      }));
    }

 
   
    const handleSubmit =(e) =>{
      e.preventDefault();
      const prevData = JSON.parse(localStorage.getItem("users")) || []
      const duplicateEmail = prevData.some(user =>user.email === userInfo.email)
      if(duplicateEmail){
        alert("This email is already registered. Please use a different one.")
        return;
      }
      prevData.push(userInfo)
      localStorage.setItem('users', JSON.stringify(prevData))
      setUserInfo({
        name:"",
        email:"",
        password:""
      })
    }
    
  return (
    <div>
      <Navbar/>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-2">
    {/* <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 ">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#"  onSubmit={handleSubmit}>
    <div>
        <label for="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
        <div className="mt-2">
          <input 
          value={userInfo.name}
          onChange={handleChange}
          type="text" name="name" id="name"  required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div> 
      <div>
        <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input 
          value={userInfo.email}
          onChange={handleChange}
          type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input 
          value={userInfo.password}
          onChange={handleChange}
          type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button 
        type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-gray-500">
      If you have Account
      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</a>
    </p>
  </div>
</div>
    </div>
  )
}

export default RegisterationForm
