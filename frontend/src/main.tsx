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
import CartTestPage from './pages/CartTestPage'

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
    path: '/test',
    element: <Test/>
  },
  {
    path: 'Filter',
    element: <FilterPage/>,
  },
  {
    path: '/CartTestPage',
    element: <CartTestPage/>,
  }, 
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
    
  </React.StrictMode>
)
