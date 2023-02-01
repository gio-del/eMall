import { useEffect, useState } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import { messaging } from '../firebase'
import { getToken } from 'firebase/messaging'
import { BASE_API } from '../constant'

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
  const [messagingToken, setMessagingToken] = useState()

  const notificationPermissionListener = () => {
    if (Notification.permission === 'granted') return
    Notification.requestPermission().then(function (status) {
      if (status === 'denied') {
        console.log('Notification permission denied')
      } else if (status === 'granted') {
        getToken(messaging, {
          vapidKey:
            'BORUQGOlid8A8zzieKgNFxJDp4BUKvdM8FRCnO_WQVyjT-xWOzHqslcDSk3Tw7U10Ey8Gbcf4JRcUAzbABcCUFY',
        }).then((token) => {
          console.log(token)
          setMessagingToken(token)
          document.removeEventListener('click', () =>
            notificationPermissionListener(),
          )
        })
      }
    })
  }

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      document.addEventListener('click', () => notificationPermissionListener())
    } else {
      document.removeEventListener('click', () =>
        notificationPermissionListener(),
      )
    }
  }, [])

  const handlePatchMessagingToken = async () => {
    const response = await fetch(`${BASE_API}/driver/user/notification`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        messagingToken: messagingToken,
      }),
    })
  }

  useEffect(() => {
    if (!document.cookie.includes('token')) {
      navigate('/home')
    }
  }, [])

  useEffect(() => {
    document.removeEventListener('click', () =>
      notificationPermissionListener(),
    )
    if (messagingToken) {
      handlePatchMessagingToken()
    }
  }, [messagingToken])

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
