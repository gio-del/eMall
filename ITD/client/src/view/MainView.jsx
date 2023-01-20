import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useRoutes } from 'react-router-dom'
import BottomBar from '../component/BottomBar'
import Car from '../component/Car/Car'
import Profile from '../component/Profile/Profile'
import Reservation from '../component/Reservation/Reservation'
import MapView from './MapView'

/**
 * This view is the main one, so it is the core of the application (map, reservation history, car settings, profile)
 */
export default function MainView() {
  const navigate = useNavigate()
  useEffect(() => {
    if (false)
      // this should be if(!there is a token) so you are not authenticate and navigate to login
      navigate('/login')
  }, [])

  const activeRoutes = useRoutes([
    {
      path: '/',
      element: <MapView />,
    },
    {
      path: '/reservation',
      element: <Reservation />,
    },
    {
      path: '/car',
      element: <Car />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
  ])

  return (
    <div className="min-h-screen bg-dk-secondary ">
      {activeRoutes}
      <BottomBar />
    </div>
  )
}
