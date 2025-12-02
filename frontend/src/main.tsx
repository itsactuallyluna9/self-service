import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'
import SignIn from './pages/SignIn'
import HomePage from './pages/HomePage'
//import CourseInformationPage from './pages/CourseInformationPage'

const router = createBrowserRouter([
  {
    path: '/HomePage',
    element: <HomePage/>,
  }, 
  {
    path: '/',
    element: <SignIn/>,
    errorElement: <h1>Error 404: Page Not Found</h1>,
  },
/*  {
    path: '/CourseInformationPage',
    element: <CourseInformationPage/>,
  },*/
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
