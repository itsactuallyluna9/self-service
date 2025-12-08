import { useState } from 'react'
import { useParams, Link, useNavigate, Navigate } from 'react-router'
import CartTemplate from '../components/CartTemplate';
import "../components/Cart.css"
//import { createBrowserRouter } from "react-router";
//import { RouterProvider } from "react-router/dom";
//import  BrowserRouter from 'react-router-dom'

function App() {
  

  return (
    
      <div>
        <CartTemplate></CartTemplate>
      </div>
    
  )
}

export default App
