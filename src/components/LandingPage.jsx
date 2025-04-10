import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { DarkModeContext } from "./DarkModeContext";

const LandingPage = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <>
    <Navbar/>
    <div className={`${darkMode ? "bg-slate-900 text-white" : "bg-gradient-to-br from-gray-100 via-white to-blue-100 text-gray-900"} h-[100vh]`}>
  

  <div className="relative isolate px-6  lg:px-8">
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-26">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-balance  sm:text-7xl">Crush Your Tasks, One Step at a Time</h1>
        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Success doesn’t come from doing everything at once—it comes from doing the right things, one step at a time. This app helps you stay focused, organized, and motivated every day. Turn your tasks into milestones, your plans into progress, and your time into something truly meaningful.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to='/signup' href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</Link>
          <a href="#" className="text-sm/6 font-semibold ">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default LandingPage
