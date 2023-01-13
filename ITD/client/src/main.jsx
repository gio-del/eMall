import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import './index.css'
import ErrorView from './view/404'
import LoginView from './view/LoginView'
import RootLayout from './view/RootLayout'
import WelcomeView from './view/WelcomeView'
import RegistrationView from './view/RegistrationVIew'
import BeforeLoginView from './view/BeforeLoginView'
import MainView from './view/MainView'
import MapView from './view/MapView'
import Car from './component/Car/Car'
import Reservation from './component/Reservation/Reservation'
import Profile from './component/Profile/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/',
        element: <BeforeLoginView />,
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
            path: '/signup',
            element: <RegistrationView />,
          },
        ],
      },
      {
        path: '/main',
        element: <MainView />,
        children: [
          {
            path: '/main',
            element: <MapView />,
          },
          {
            path: '/main/reservation',
            element: <Reservation/>,
          },          
          {
            path: '/main/car',
            element: <Car />,
          },
          {
            path: '/main/profile',
            element: <Profile/>,
          },
        ],
      },
    ],
  },
  {
    path: '/afterlogin',
    element: <p>ciao</p>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
