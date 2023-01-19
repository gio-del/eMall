import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import BottomBar from '../component/BottomBar'
import NavBar from '../component/NavBar'


/**
 * This view is the main one, so it is the core of the application (map, reservation history, car settings, profile)
 */
export default function MainView() {
  const navigate = useNavigate()
  useEffect(() => {
    if (false) // this should be if(!there is a token) so you are not authenticate and navigate to login
      navigate('/login')
  }, [])
  return (
    <div className="min-h-screen bg-dk-secondary ">
      <Outlet />
      <BottomBar />
    </div>
  )
}
