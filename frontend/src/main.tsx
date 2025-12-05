import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import './index.css'
import SignIn from './pages/SignIn'
import HomePage from './pages/HomePage'
import IndividualCourseInfo from './pages/IndividualCourseInfo'
import CourseInformationPage from './pages/CourseInformationPage'
import Test from './pages/Test'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn/>,
    errorElement: <h1>Error 404: Page Not Found</h1>,
  },
  {
    path: '/CourseInformationPage',
    element: <CourseInformationPage/>,
  },
  {
    path: '/CourseInfo',
    element: <IndividualCourseInfo/>
  },
  {
    path: '/HomePage',
    element: <HomePage/>,
  }, 
  {
    path: '/SignIn',
    element: <SignIn/>
  }
/*  {
    path: '/test',
    element: <Test/>
  },*/
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
