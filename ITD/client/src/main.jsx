import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import './index.css'
import ErrorView from './view/404'
import LoginView from './view/LoginView'
import RootLayout from './view/RootLayout'
import WelcomeView from './view/WelcomeView'
import AboutView from './view/MapView'
import Booking from './component/Booking/Booking'
import RegistrationView from './view/RegistrationVIew'
import BeforeLoginView from './view/BeforeLoginView'
import MainView from './view/MainView'
import MapView from './view/MapView'
import Car from './component/Car/Car'

const router = createBrowserRouter(
  [
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
              element: <p>We will create a view for reservation!</p>,
            },
            {
              path: '/main/car',
              element: <Car/>,
            },
            {
              path: '/main/profile',
              element: <p>We will create a view for profile!</p>,
            },
          ],
        },
        {
          path: '/book',
          element: (
            <Booking
              CPOName={'Ionity'}
              Address={'Via Gran Sasso, 1, Milano'}
              Connectors={[
                //CPOName, Address and Connectors comes from an API
                {
                  type: 'CCS2',
                  power: '110 kW',
                  price: '1,50$/h + 0,92$/kW',
                  totalSockets: 1,
                  availableSockets: 1,
                  current: 'DC',
                },
                {
                  type: 'Type2',
                  power: '50 kW',
                  price: '1,50$/h + 0,94$/kW',
                  totalSockets: 2,
                  availableSockets: 1,
                  current: 'AC',
                },
              ]}
              Date={'2022-11-11'} //this comes from drawers that comes from date in search bar
            />
          ),
        },
      ],
    },
    {
      path: '/afterlogin',
      element: <p>ciao</p>,
    },
  ],
  {
    basename: '/BattistonDeLuciaCurro-swe2',
  },
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
