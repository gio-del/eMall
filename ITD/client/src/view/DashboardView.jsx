import { useLocation, useRoutes } from 'react-router-dom'

import OverviewTab from '../component/Dashboard/OverviewTab'
import ChargingPointsTab from '../component/Dashboard/ChargingPointsTab'
import RatesTab from '../component/Dashboard/RatesTab'
import ReservationsTab from '../component/Dashboard/ReservationsTab'
import EnergyTab from '../component/Dashboard/EnergyTab'

import { useEffect, useState } from 'react'
import DashboardNavBar from '../component/Dashboard/DashboardNavBar'
import { BASE_API } from '../constant'

export default function DashboardView() {
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



  const evcpMockupList = ['evcp1', 'evcp2']

  const getEvcps = async () => {/*
    try {
      const response = await fetch(
        `${BASE_API}/cpo/cp/evcps/`,
        { credentials: 'include' },
      )

      if (response.status === 200) {
        const evcpsRows = await response.json()
      }
    } catch (err) {
      console.error(err)
    }
    */
  
  }


  useEffect(() => {
    const path = location.pathname.split('/')[2]
    setActiveTab(path)
  }, [location])

  useEffect(() => {
    getEvcps()
  },  )

  const activeRoutes = useRoutes([
    {
      path: '/',
      element: <OverviewTab />,
    },
    {
      path: '/charging-points',
      element: <ChargingPointsTab evcpList={evcpMockupList}/>,
    },
    {
      path: '/rates',
      element: <RatesTab evcpList={evcpMockupList}/>,
    },
    { path: '/reservations', element: <ReservationsTab evcpList={evcpMockupList}/> },
    {
      path: '/energy',
      element: <EnergyTab evcpList={evcpMockupList}/>,
    },
  ])

  return (
    <>
      <div className="flex h-screen w-screen dashboard">
        <DashboardNavBar activeTab={activeTab} />
        <div className="bg-tertiary w-full">
          <div className="bg-white flex items-center justify-between lg:h-[12%] max-lg:h-[6%] pr-5">
            <p className="lg:ml-10 text-lg font-bold">
              {map.get(location.pathname.split('/')[2])}
            </p>
            <p>Logout</p>
          </div>
          {activeRoutes}
        </div>
      </div>
    </>
  )
}
