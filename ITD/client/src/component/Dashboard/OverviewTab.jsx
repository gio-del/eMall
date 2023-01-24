import { Link, useLocation, useRoutes } from 'react-router-dom'
import IconSVG from './IconSVG'
import ActionButton from './ActionButton'
import ChargingPointsTab from './ChargingPointsTab'
import RatesTab from './RatesTab'
import ReservationsTab from './ReservationsTab'
import EnergyTab from './EnergyTab'
import ChartButton from './ChartButton'
import ReservationChart from './ReservationChart'

export default function OverviewTab() {
  const earnings = {
    title: 'Total this week',
    subtitle: 'x reservations',
    content: '€9328.60',
    bottomTitle: '+ €1432 this week',
    svgType: 'shop',
    colorBGsvg: 'bg-dash-gray-dark',
  }
  const active = {
    title: 'Active Charging Points',
    subtitle: 'now',
    content: '34',
    bottomTitle: '3 more from the last week',
    svgType: 'cp',
    colorBGsvg: 'bg-dash-green',
  }
  const nonActive = {
    title: 'Total this week',
    subtitle: 'now',
    content: '4',
    bottomTitle: '2 less from the last week',
    svgType: 'cp',
    colorBGsvg: 'bg-dash-red',
  }
  const dso = {
    title: 'DSO contract',
    subtitle: 'x available',
    content: 'Enel Energy',
    bottomTitle: '0.70 €/kW',
    svgType: 'dso',
    colorBGsvg: 'bg-dash-gray-dark',
  }
  const data = {
    labels: ['Grid', 'Solar', 'Energy Storage'],
    datasets: [
      {
        label: 'Percentage of production',
        data: [80, 12, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

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

  return (
    <>
      <div className="flex py-10 items-stretch px-10 w-full h-[calc(100%-10rem)]">
        <div className="grid max-lg:grid-cols-1 lg:grid-cols-4 w-full h-full gap-4">
          <Link to="./reservations">
            <ActionButton background={'bg-black'} data={earnings} />
          </Link>
          <Link to="./charging-points">
            <ActionButton background={'bg-white'} data={active} />
          </Link>
          <Link to="./charging-points">
            <ActionButton background={'bg-white'} data={nonActive} />
          </Link>
          <Link to="./energy">
            <ActionButton background={'bg-white'} data={dso} />
          </Link>
          <Link to="./energy" className="lg:col-span-3 lg:row-span-4">
            <ReservationChart />
          </Link>
          <Link to="./energy" className="lg:row-span-2 max-lg:hidden">
            <ChartButton data={data} text={'Energy mix now'} />
          </Link>
          <Link to="./energy" className="lg:row-span-2 max-lg:hidden">
            <ChartButton data={data} text={'Energy mix this week'} />
          </Link>
        </div>
      </div>
    </>
  )
}
