import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import './index.css'
import ErrorView from './view/404'
import LoginView from './view/LoginView'
import RootLayout from './view/RootLayout'
import WelcomeView from './view/WelcomeView'
import AboutView from './view/AboutView'
import Booking from './component/Booking'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/',
        element: <WelcomeView />,
      },
      {
        path: '/login/',
        element: <LoginView />,
      },
      {
        path: '/about/',
        element: <AboutView />,
      },
      {
        path: '/book',
        element: <Booking CPOName="Ionity" Address="Via Gran Sasso, 1, Milano" />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
