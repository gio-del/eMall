import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import BottomBar from '../component/BottomBar'
import NavBar from '../component/NavBar'
import useWindowDimensions from './useWindowDimensions'

/**
 * This view is the main one, so it is the core of the application (map, reservation history, car settings, profile)
 */
export default function MainView() {
  const [actualTab, setActualTab] = useState('map')
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate()
  useEffect(() => {
    if (false) // this should be if(!there is a token) so you are not authenticate and navigate to login
      navigate('/login')
  }, [])
  return (
    <div className={`h-[${height}px] w-[${width}px] `}>
      <Outlet />
      <BottomBar actualTab={actualTab} setActualTab={setActualTab} />
    </div>
  )
}
