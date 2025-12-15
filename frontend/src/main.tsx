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
import FinancialBalance from './pages/FinancialBalancePage'
import AddCoursePage from './pages/AddCoursePage'
import CreateCoursePage from './pages/CreateCoursePage'

import PasswordReset from './pages/PasswordReset'
import CreateCoursePage from './pages/CreateCoursePage'
import UnofficialTranscript from './pages/UnofficialTranscript'
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
    path: '/FinancialBalance',
    element: <FinancialBalance/>
  },
  {
    path: '/AddCoursePage',
    element: <AddCoursePage/>
  },
  {
    path: '/CreateCoursePage',
    element: <CreateCoursePage/>
    path: 'PasswordReset',
    element: <PasswordReset/>
  },
  {
    path: 'CreateCoursePage',
    element: <CreateCoursePage/>
  },
  {
    path: '/UnofficialTranscript',
    element: <UnofficialTranscript/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
    
  </React.StrictMode>
)