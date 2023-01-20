import { Link, useLocation, useRoutes } from 'react-router-dom'
import IconSVG from './IconSVG'
import ActionButton from './ActionButton'
import ChargingPointsTab from './ChargingPointsTab'
import RatesTab from './RatesTab'
import ReservationsTab from './ReservationsTab'
import EnergyTab from './EnergyTab'


export default function OverviewTab() {

  const earnings = {title: 'Total this week', subtitle: "x reservations", content: '€9328.60', bottomTitle: '+ €1432 this week', svgType: 'shop', colorBGsvg: 'bg-dash-gray-dark'};
  const active = {title: 'Active Charging Points', subtitle: "now", content: '34', bottomTitle: '3 more from the last week', svgType: 'cp', colorBGsvg: 'bg-dash-green'};
  const nonActive = {title: 'Total this week', subtitle: "now", content: '4', bottomTitle: '2 less from the last week', svgType: 'cp', colorBGsvg: 'bg-dash-red'};
  const dso = {title: 'DSO contract', subtitle: "x available", content: 'Enel Energy', bottomTitle: '0.70 €/kW', svgType: 'dso', colorBGsvg: 'bg-dash-gray-dark'};

  const location = useLocation()

  const activeRoutes = useRoutes([
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



  return <>
    <div className=' content-between h-full'>
      
      <div className="flex grow py-20 px-10 w-full h-full">
        <div className="grid grid-cols-4 w-full gap-4 ">
          <Link to="/cpo/reservations">
            <ActionButton background={"bg-black"} data={earnings} />
          </Link>
          <Link to="/cpo/charging-points">
            <ActionButton background={"bg-white"} data={active} />
          </Link>
          <Link to="/cpo/charging-points">
            <ActionButton background={"bg-white"} data={nonActive} />
          </Link>
          <Link to="/cpo/energy">
            <ActionButton background={"bg-white"} data={dso} />
          </Link>
          <div className="bg-white  rounded-2xl col-span-3 row-span-2">
          </div>
          <Link to="/cpo/energy">
            <ActionButton background={"bg-white"} data={nonActive} />
          </Link>
          <Link to="/cpo/energy">
            <ActionButton background={"bg-white"} data={dso} />
          </Link>


        </div>
      </div>
    </div>

  </>
}
