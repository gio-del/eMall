import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import faker from 'faker'
import { useState } from 'react'
import RadioButton from '../utilitycomponent/RadioButton'
import { useEffect } from 'react'

export default function ReservationChart({earnings}) {
  const [filter, setFilter] = useState()
  const [lastSeven, setLastSeven] = useState()
  const [lastThirty, setLastThirty] = useState()
  const [dataChart, setDataChart] = useState()

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  }


  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  const calculateLastSeven = () => {
    const last = []
    const dataLast = []
    for(let i = -1; i < 6; i++) {
      let date = new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000)
      let totalForDay = 0
      earnings.map((row) => (row.date == date ? totalForDay = totalForDay + row.profit : totalForDay = totalForDay))
      last.push(`${date.getDate()}/${date.getMonth() + 1}`)
    }
    setLastSeven(last)

  }

  const calculateLastThrity = () => {
    const last = []
    for(let i = -1; i < 30; i++) {
      let date = new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000)
      last.push(`${date.getDate()}/${date.getMonth() + 1}`)
    }
    setLastThirty(last)
  }

  useEffect(() => {
    calculateLastSeven()
    calculateLastThrity()
  }, [])



  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <>
      <div className='flex-col bg-white w-full h-full hover:shadow-xl p-4 rounded-xl'>
        <form id="addRate" className=' w-full justify-end flex'>
          <div className="flex flex-col justify-end mb-2">
            <p className="block text-md text-right text-gray-700 font-medium mb-2">Select a view</p>
            <div className="flex justify-between">
              <div className='flex gap-4'>
                <div>
                <RadioButton
                    role={filter}
                    name="Last 7 days"
                    setRole={setFilter}
                  />
                </div>
                  
                <div>
                  <RadioButton
                    role={filter}
                    name="Last 30 days"
                    setRole={setFilter}
                  />
                </div>
                 <div>
                 <RadioButton
                    role={filter}
                    name="Last 3 months"
                    setRole={setFilter}
                  />
                 </div>
                 
              </div>
            </div>
          </div>

        </form>
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="absolute inset-0 flex-col h-full w-full overflow-auto">
            <div className="w-full h-auto">
              <Line options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
