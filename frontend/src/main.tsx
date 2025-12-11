import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { CartContextProvider } from './components/CartContext'

import './index.css'
import SignIn from './pages/SignIn'
import HomePage from './pages/HomePage'
import IndividualCourseInfo from './pages/IndividualCourseInfo'
import CourseInformationPage from './pages/CourseInformationPage'
import FilterPage from './pages/FilterPage'
import RegisteredCourses from './pages/RegisteredCourses'
import AddCoursePage from './pages/AddCoursePage'
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
  },
  {
    path: '/Filter',
    element: <FilterPage/>,
  },
  {
    path: '/RegisteredCourses',
    element: <RegisteredCourses/>
  },
  {
    path: '/AddCoursePage',
    element: <AddCoursePage/>
  }
/*  {
    path: '/test',
    element: <Test/>
  },*/
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
    
  </React.StrictMode>
)