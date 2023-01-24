import { useLocation, useRoutes } from 'react-router-dom'

import OverviewTab from '../component/Dashboard/OverviewTab'
import ChargingPointsTab from '../component/Dashboard/ChargingPointsTab'
import RatesTab from '../component/Dashboard/RatesTab'
import ReservationsTab from '../component/Dashboard/ReservationsTab'
import EnergyTab from '../component/Dashboard/EnergyTab'

import { useEffect, useState } from 'react'
import DashboardNavBar from '../component/Dashboard/DashboardNavBar'

export default function DashboardView() {
  const [activeTab, setActiveTab] = useState()
  const location = useLocation()

  const map = new Map([
    ['charging-points', 'Charging Points'],
    ['rates', 'Rates'],
    ['reservations', 'Reservations'],
    ['energy', 'Energy'],
    [undefined, 'Overview'],
  ])

  useEffect(() => {
    const path = location.pathname.split('/')[2]
    setActiveTab(path)
  }, [location])

  const activeRoutes = useRoutes([
    {
      path: '/',
      element: <OverviewTab />,
    },
    {
      path: '/charging-points',
      element: <ChargingPointsTab />,
    },
    {
      path: '/rates',
      element: <RatesTab />,
    },
    { path: '/reservations', element: <ReservationsTab /> },
    {
      path: '/energy',
      element: <EnergyTab />,
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
