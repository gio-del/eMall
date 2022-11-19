import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import './index.css'
import ErrorView from './view/404'
import LoginView from './view/LoginView'
import RootLayout from './view/RootLayout'
import WelcomeView from './view/WelcomeView'

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
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
