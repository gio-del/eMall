import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ActionButton from './ActionButton'
import ChartButton from './ChartButton'
import ReservationChart from './ReservationChart'
import { BASE_API } from '../../constant'

export default function OverviewTab() {
  const [earnings, setEarnings] = useState()
  const [filter, setFilter] = useState()
  const earningsx = {
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

  const getOverviewData = async () => {
    try {
      const response = await fetch(`${BASE_API}/cpo/book/`, {
        credentials: 'include',
      })
      if (response.status === 200) {
        const jsonData = await response.json()
        setEarnings(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getOverviewData()
  }, [])

  return (
    <>
      <div className="flex py-10 items-stretch px-10 w-full h-[calc(100%-10rem)]">
        <div className="grid max-lg:grid-cols-1 lg:grid-cols-4 w-full h-full gap-4">
          <Link to="./reservations">
            <ActionButton background={'bg-black'} data={earningsx} />
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
          <div className="lg:col-span-3 lg:row-span-4">
            <p>Filter by</p>
            <div className="border-2 border-dash-gray">
              <div key="day">
                <input
                  onChange={() => setFilter('day')}
                  type={'day'}
                  id={'day'}
                />
                <label htmlFor="day">
                  <div className="border-l-2 dark:border-tertiary border-dk-secondary flex  h-full p-3">
                    <div>
                      <p className="font-light text-sm">day</p>
                    </div>
                  </div>
                </label>
              </div>
              <div key="week">
                <input
                  onChange={() => setFilter('week')}
                  type={'week'}
                  id={'week'}
                />
                <label htmlFor="week">
                  <div className="border-l-2 dark:border-tertiary border-dk-secondary flex  h-full p-3">
                    <div>
                      <p className="font-light text-sm">week</p>
                    </div>
                  </div>
                </label>
              </div>
              <div key="year">
                <input
                  onChange={() => setFilter('year')}
                  type={'year'}
                  id={'year'}
                />
                <label htmlFor="year">
                  <div className="border-l-2 dark:border-tertiary border-dk-secondary flex  h-full p-3">
                    <div>
                      <p className="font-light text-sm">year</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <ReservationChart data={earnings} filter={filter} />
          </div>
          <div className="lg:row-span-2 max-lg:hidden">
            <ChartButton data={data} text={'Energy mix now'} />
          </div>
          <div className="lg:row-span-2 max-lg:hidden">
            <ChartButton data={data} text={'Energy mix this week'} />
          </div>
        </div>
      </div>
    </>
  )
}
