import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

import './index.css'
import ErrorView from './view/404'
import LoginView from './view/LoginView'
import RootLayout from './view/RootLayout'
import WelcomeView from './view/WelcomeView'
import AboutView from './view/AboutView'
import Booking from './component/Booking/Booking'

const router = createBrowserRouter([
  {
    path: '/eMallFrontEnd',
    element: <RootLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: '/eMallFrontEnd',
        element: <WelcomeView />,
      },
      {
        path: 'eMallFrontEnd/login/',
        element: <LoginView />,
      },
      {
        path: 'eMallFrontEnd/about/',
        element: <AboutView />,
      },
      {
        path: 'eMallFrontEnd/book',
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
              },
              {
                type: 'Type2',
                power: '50 kW',
                price: '1,50$/h + 0,94$/kW',
                totalSockets: 2,
                availableSockets: 1,
              },
            ]}
            Date={'2022-11-11'} //this comes from drawers that comes from date in searchbar
          />
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
