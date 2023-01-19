import { Link, useRoutes } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

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

export default function DashboardView() {
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
            <div className="flex flex-row justify-center mt-10">
              <ReactSVG
                src={thunder}
                afterInjection={(_err, svg) =>
                  svg.classList.add('fill-tertiary')
                }
              />
              <p className="text-tertiary">eMall for Business</p>
            </div>
          </Link>

          <div className="mt-20 p-5 text-tertiary">
            <Link to="/cpo">
              <div className="flex flex-row mb-5">
                <ReactSVG
                  className="mr-4"
                  src={dashboard}
                  afterInjection={(_err, svg) =>
                    svg.classList.add('fill-tertiary')
                  }
                />
                <p>Overview</p>
              </div>
            </Link>
            <Link to="/cpo/charging-points">
              <div className="flex flex-row mb-5">
                <ReactSVG
                  className="mr-4"
                  src={cps}
                  afterInjection={(_err, svg) =>
                    svg.classList.add('fill-tertiary')
                  }
                />
                <p>Charging Points</p>
              </div>
            </Link>
            <Link to="/cpo/rates">
              <div className="flex flex-row mb-5">
                <ReactSVG
                  className="mr-4"
                  src={rates}
                  afterInjection={(_err, svg) =>
                    svg.classList.add('fill-tertiary')
                  }
                />
                <p>Rates</p>
              </div>
            </Link>
            <Link to="/cpo/reservations">
              <div className="flex flex-row mb-5">
                <ReactSVG
                  className="mr-4"
                  src={reservations}
                  afterInjection={(_err, svg) =>
                    svg.classList.add('fill-tertiary')
                  }
                />
                <p>Reservations</p>
              </div>
            </Link>
            <Link to="/cpo/energy">
              <div className="flex flex-row mb-5">
                <ReactSVG
                  className="mr-4"
                  src={energy}
                  afterInjection={(_err, svg) =>
                    svg.classList.add('fill-tertiary')
                  }
                />
                <p>Energy</p>
              </div>
            </Link>
          </div>
        </div>
        {activeRoutes}
      </div>
    </>
  )
}
