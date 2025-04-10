import React, { useEffect, useState } from 'react'
import RegisterationForm from './RegisterationForm'
import LoginForm from './LoginForm'
import Navbar from './Navbar'


const Home = () => {
  const [isTaskAdd, setIsTaskAdd] = useState(false)
  const [taskList, setTaskList] = useState([])
  const [isTasks,setIsTask] = useState({
    title:"",
    description:""

  })

  const [editTask, setEditTask] = useState(null)
  const [completeTask, setCompleteTask] = useState([])

  useEffect (()=>{
    const storedTask = JSON.parse(localStorage.getItem("allTask")) || []
    setTaskList(storedTask)
    const storedCompTask =  JSON.parse(localStorage.getItem("completeTask")) || []
    setCompleteTask(storedCompTask)
  },[])
  const taskOnChange = (e) =>{
      const {name,value} = e.target;
      setIsTask((prev)=>({
        ...prev,[name]:value
      }))
  }

  const taskHandleSubmit =(e)=>{
    e.preventDefault();

    if(editTask){
      const updateTasks = taskList.map((task) =>
        task.id === editTask ? {...task, ...isTasks}:task
      );
      setTaskList(updateTasks)
      localStorage.setItem('allTask',JSON.stringify(updateTasks))
      setEditTask(null) 
    }else{
      const newTask ={
        ...isTasks,
        id:Date.now()
      };
      const newTaskList = [...taskList,newTask]
      setTaskList(newTaskList)
      localStorage.setItem("allTask",JSON.stringify(newTaskList))
    }
    setIsTask({
      title:"",
    description:""
    })
    setIsTaskAdd(false)
  }
  const handleEdit = (task) =>{
    setIsTask(task)
    setEditTask(task.id)
    setIsTaskAdd(true)
  }
  const handleDelete = (id) =>{
     // Delete from pending tasks
     const isPending = taskList.some((task) =>task.id === id);
     if(isPending){
      const updatePending = taskList.filter((task) =>task.id !== id);
      setTaskList(updatePending)
      localStorage.setItem("allTask",JSON.stringify(updatePending))
     }
    // Delete from completed tasks
    const isCompleting = completeTask.some((task) =>task.id === id);
     if(isCompleting){
      const updatedCompleted = completeTask.filter((task) =>task.id !== id);
      setCompleteTask(updatedCompleted)
      localStorage.setItem("completedTask",JSON.stringify(updatedCompleted))
     }
  }
  const handleComplete = (id) =>{
    const completedTask = taskList.find((task) =>task.id === id);
    if(completedTask){
      const updateTasks = taskList.filter((task) =>task.id !== id);
      const updateCompleted = [...completeTask, completedTask ]
      setTaskList(updateTasks)
      setCompleteTask(updateCompleted)
      localStorage.setItem('allTask', JSON.stringify(updateTasks))
      localStorage.setItem("completedTask", JSON.stringify(updateCompleted))
    }
  }
  return (
   <>
  
<div className="flex flex-wrap min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-100 p-6 mt-[4rem]">
  {/* Pending Task Section */}
  <div className="w-full md:w-1/2 p-4">
    <div className="backdrop-blur-md rounded-xl shadow-lg p-6 h-full max-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Pending Tasks</h1>
        <button
          onClick={() => setIsTaskAdd(!isTaskAdd)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          + Add your Task
        </button>
      </div>

      {/* Scrollable list */}
      <div className="overflow-y-auto pr-2 space-y-4">
        {taskList.map((task, index) => (
          <div
            key={index}
            className="border-l-4 border-red-500 bg-white text-black rounded-lg p-4 shadow-sm"
          >
            <h3 className="text-lg font-light">#{index+1}.<span className='font-semibold'>{task.title}</span></h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleComplete(task.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Complete
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Completed Task Section */}
  <div className="w-full md:w-1/2 p-4">
    <div className="backdrop-blur-md rounded-xl shadow-lg p-6 h-full max-h-[80vh] flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Completed Tasks</h1>

      {/* Scrollable list */}
      <div className="overflow-y-auto pr-2 space-y-4">
        {completeTask.map((task, index) => (
          <div
            key={index}
            className="border-l-4 border-green-500 bg-white text-black rounded-lg p-4 shadow-sm"
          >
            <h3 className="text-lg font-light">#{index+1}.<span className='font-semibold'>{task.title}</span></h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Modal for Add Task */}
  {isTaskAdd && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white z-50 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Add New Task</h2>
        <form className="space-y-4" onSubmit={taskHandleSubmit}>
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={isTasks.title}
              onChange={taskOnChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={isTasks.description}
              onChange={taskOnChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsTaskAdd(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
   </>
  )
}

export default Home
