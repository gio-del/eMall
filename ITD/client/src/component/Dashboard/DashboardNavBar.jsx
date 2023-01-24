import thunder from '../../assets/dashboard/thunder.svg'
import rates from '../../assets/dashboard/rates.svg'
import dashboard from '../../assets/dashboard/dashboard.svg'
import cps from '../../assets/dashboard/cps.svg'
import reservations from '../../assets/dashboard/reservations.svg'
import energy from '../../assets/dashboard/energy.svg'
import IconSVG from '../../component/Dashboard/IconSVG'

import style from './DashboardNavBar.css'
import { Link } from 'react-router-dom'

export default function DashboardNavBar({ activeTab }) {
  return (
    <>
      <div className="w-1/5 bg-gradient-to-b from-dk-secondary to-dk-nav h-full py-5 max-lg:hidden">
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
              <p className="ml-4">Overview</p>
            </div>
          </Link>
          <Link to="/cpo/charging-points">
            <div
              className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                activeTab === 'charging-points' ? 'active' : ''
              }`}
            >
              <IconSVG src={cps} className="fill-tertiary" />
              <p className="ml-4">Charging Points</p>
            </div>
          </Link>
          <Link to="/cpo/rates">
            <div
              className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                activeTab === 'rates' ? 'active' : ''
              }`}
            >
              <IconSVG src={rates} className="fill-tertiary" />
              <p className="ml-4">Rates</p>
            </div>
          </Link>
          <Link to="/cpo/reservations">
            <div
              className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                activeTab === 'reservations' ? 'active' : ''
              }`}
            >
              <IconSVG src={reservations} className="fill-tertiary" />
              <p className="ml-4">Reservations</p>
            </div>
          </Link>
          <Link to="/cpo/energy">
            <div
              className={`flex flex-row mb-5 items-center hover:bg-dk-secondary p-4 rounded-2xl ${
                activeTab === 'energy' ? 'active' : ''
              }`}
            >
              <IconSVG src={energy} className="fill-tertiary" />
              <p className="ml-4">Energy</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-2 bg-gradient-to-l from-dk-secondary to-dk-nav h-16 lg:hidden">
        <div className="text-tertiary flex flex-row justify-between items-center">
          <Link to="/cpo">
            <div
              className={`flex flex-col justify-content items-center ${
                activeTab === undefined ? 'active' : ''
              }`}
            >
              <IconSVG src={dashboard} className="fill-tertiary" />
              <p className="">Overview</p>
            </div>
          </Link>
          <Link to="/cpo/charging-points">
            <div
              className={`flex flex-col justify-content items-center ${
                activeTab === 'charging-points' ? 'active' : ''
              }`}
            >
              <IconSVG src={cps} className="fill-tertiary" />
              <p className="">Charging Points</p>
            </div>
          </Link>
          <Link to="/cpo/rates">
            <div
              className={`flex flex-col justify-content items-center ${
                activeTab === 'rates' ? 'active' : ''
              }`}
            >
              <IconSVG src={rates} className="fill-tertiary" />
              <p className="">Rates</p>
            </div>
          </Link>
          <Link to="/cpo/reservations">
            <div
              className={`flex flex-col justify-content items-center ${
                activeTab === 'reservations' ? 'active' : ''
              }`}
            >
              <IconSVG src={reservations} className="fill-tertiary" />
              <p className="">Reservations</p>
            </div>
          </Link>
          <Link to="/cpo/energy">
            <div
              className={`flex flex-col justify-content items-center ${
                activeTab === 'energy' ? 'active' : ''
              }`}
            >
              <IconSVG src={energy} className="fill-tertiary" />
              <p className="">Energy</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
