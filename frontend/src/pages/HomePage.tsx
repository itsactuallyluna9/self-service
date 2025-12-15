import { useState } from 'react'
import { useParams } from 'react-router'
import '../cssFiles/HomePage.css'

import Navbar from '../components/Navbar'
import '../cssFiles/HomePage.css'
//import { createBrowserRouter } from "react-router";
//import { RouterProvider } from "react-router/dom";
//import  BrowserRouter from 'react-router-dom'

function App() {
  const params = useParams();
  console.log(params)
  console.log("UserType: " + localStorage.getItem('UserType'))

  return (
    <>
      <Navbar />
    <div className='welcome-message'>
      <h1>Welcome to Self Service</h1>
    </div>
    </>
  )
}

export default App