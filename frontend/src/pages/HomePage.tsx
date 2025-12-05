import { useState } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router'

import Navbar from '../components/Navbar'
//import { createBrowserRouter } from "react-router";
//import { RouterProvider } from "react-router/dom";
//import  BrowserRouter from 'react-router-dom'

function App() {
  const params = useParams();
  console.log(params)
  const nav = useNavigate()
  
  const toCourseInfo = () => {
    nav('/CourseInfo',{state:{code:30}})
  }

  return (
    <>
      <Navbar />
    </>
  )
}

export default App