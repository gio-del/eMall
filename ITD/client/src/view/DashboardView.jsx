import { useLocation, useNavigate, useRoutes } from 'react-router-dom'

import OverviewTab from '../component/Dashboard/OverviewTab'
import ChargingPointsTab from '../component/Dashboard/ChargingPointsTab'
import RatesTab from '../component/Dashboard/RatesTab'
import ReservationsTab from '../component/Dashboard/ReservationsTab'
import EnergyTab from '../component/Dashboard/EnergyTab'

import { useEffect, useState } from 'react'
import DashboardNavBar from '../component/Dashboard/DashboardNavBar'
import { BASE_API } from '../constant'

export default function DashboardView() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState()
  const [evcpList, setEvcpList] = useState()
  const location = useLocation()

  const map = new Map([
    ['charging-points', 'Charging Points'],
    ['rates', 'Rates'],
    ['reservations', 'Reservations'],
    ['energy', 'Energy'],
    [undefined, 'Overview'],
  ])

  const getEvcps = async () => {
    try {
      const response = await fetch(`${BASE_API}/cpo/cp/`, {
        credentials: 'include',
      })

      if (response.status === 200) {
        const jsonData = await response.json()
        setEvcpList(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getEvcps()
  }, [])

  useEffect(() => {
    const path = location.pathname.split('/')[2]
    setActiveTab(path)
  }, [location])

  const addingCP = () => {
    getEvcps()
  }

  useEffect(() => {
    if (!document.cookie.includes('token')) {
      navigate('/home/login')
    }
  }, [])

  const logout = async () => {
    try {
      const response = await fetch(`${BASE_API}/cpo/user/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error(err)
    } finally {
      navigate('/home/login')
    }
  }

  const activeRoutes = useRoutes([
    {
      path: '/',
      element: <OverviewTab/>,
    },
    {
      path: '/charging-points',
      element: <ChargingPointsTab evcpList={evcpList} setEvcpList={addingCP} />,
    },
    {
      path: '/rates',
      element: <RatesTab evcpList={evcpList} />,
    },
    {
      path: '/reservations',
      element: <ReservationsTab evcpList={evcpList} />,
    },
    {
      path: '/energy',
      element: <EnergyTab evcpList={evcpList} />,
    },
  ])

  return (
    <>
      <div className="flex h-screen w-screen dashboard">
        <DashboardNavBar activeTab={activeTab} />
        <div className="bg-tertiary w-full min-hscreen">
          <div className="bg-white flex items-center justify-between lg:h-[12%] max-lg:h-[6%] pr-5">
            <p className="lg:ml-10 text-lg font-bold">
              {map.get(location.pathname.split('/')[2])}
            </p>
            <button onClick={logout}>Logout</button>
          </div>
          {activeRoutes}
        </div>
      </div>
    </>
  )
}
