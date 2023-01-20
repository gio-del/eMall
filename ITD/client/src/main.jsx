import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import ErrorView from './view/404'
import RootLayout from './view/RootLayout'
import BeforeLoginView from './view/BeforeLoginView'
import MainView from './view/MainView'
import DashboardView from './view/DashboardView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/home/*',
        element: <BeforeLoginView />,
      },
      {
        path: '/map/*',
        element: <MainView />,
      },
      {
        path: '/cpo/*',
        element: <DashboardView />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
