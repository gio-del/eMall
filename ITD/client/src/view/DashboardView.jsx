import { Link, useLocation, useRoutes } from 'react-router-dom'

import style from '../component/Dashboard/dashboard.css'

import OverviewTab from '../component/Dashboard/OverviewTab'
import ChargingPointsTab from '../component/Dashboard/ChargingPointsTab'
import RatesTab from '../component/Dashboard/RatesTab'
import ReservationsTab from '../component/Dashboard/ReservationsTab'
import EnergyTab from '../component/Dashboard/EnergyTab'

import thunder from '../assets/dashboard/thunder.svg'
import rates from '../assets/dashboard/rates.svg'
import dashboard from '../assets/dashboard/dashboard.svg'
import cps from '../assets/dashboard/cps.svg'
import reservations from '../assets/dashboard/reservations.svg'
import energy from '../assets/dashboard/energy.svg'
import IconSVG from '../component/Dashboard/IconSVG'
import { useEffect, useState } from 'react'

export default function DashboardView() {
  const [activeTab, setActiveTab] = useState()
  const location = useLocation()

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
      <div className="flex h-full">
        <div className="w-1/5 bg-gradient-to-b from-dk-secondary to-dk-nav h-full py-5">
          <Link to="/cpo">
            <div className="flex flex-row justify-center mt-10 items-center">
              <IconSVG src={thunder} className="fill-tertiary" />
              <p className="text-tertiary">eMall for Business</p>
            </div>
          </Link>

          <div className="mt-20 p-5 text-tertiary">
            <Link to="/cpo">
              <div
                className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                  activeTab === undefined ? 'active' : ''
                }`}
              >
                <IconSVG src={dashboard} className="fill-tertiary" />
                <p  className='ml-4'>Overview</p>
              </div>
            </Link>
            <Link to="/cpo/charging-points">
              <div
                className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                  activeTab === 'charging-points' ? 'active' : ''
                }`}
              >
                <IconSVG src={cps} className="fill-tertiary" />
                <p className='ml-4'>Charging Points</p>
              </div>
            </Link>
            <Link to="/cpo/rates">
              <div
                className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                  activeTab === 'rates' ? 'active' : ''
                }`}
              >
                <IconSVG src={rates} className="fill-tertiary" />
                <p  className='ml-4'>Rates</p>
              </div>
            </Link>
            <Link to="/cpo/reservations">
              <div
                className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                  activeTab === 'reservations' ? 'active' : ''
                }`}
              >
                <IconSVG src={reservations} className="fill-tertiary" />
                <p  className='ml-4'>Reservations</p>
              </div>
            </Link>
            <Link to="/cpo/energy">
              <div
                className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                  activeTab === 'energy' ? 'active' : ''
                }`}
              >
                <IconSVG src={energy} className="fill-tertiary" />
                <p  className='ml-4'>Energy</p>
              </div>
            </Link>
          </div>
        </div>
        <div className='bg-dash-gray w-full flex-col'>
          {activeRoutes}
        </div>
      
      </div>
    </>
  )
}
