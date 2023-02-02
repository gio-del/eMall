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
import { useState } from 'react'
import RadioButton from '../utilitycomponent/RadioButton'
import { useEffect } from 'react'

export default function ReservationChart({earnings}) {
  const [filter, setFilter] = useState()
  const [labels, setLabels] = useState()
  const [range, setRange] = useState("7")
  const [dataChart, setDataChart] = useState()
  const [data, setData] = useState()

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

  const analyzeData = () => {
    const last = []
    const dataLast = []
    const today = new Date()
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)

    for (let i = 0; i < parseInt(range); i++) {
      let date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      let totalForDay = 0
      earnings.map((row) => {
        if (row.date.getDate() == date.getDate() && row.date.getMonth() == date.getMonth()) {
          totalForDay = totalForDay + parseFloat(row.profit)
        }
      })
      dataLast.unshift(totalForDay)
      last.unshift(`${date.getDate()}/${date.getMonth() + 1}`)
    }
    setLabels(last)
    setDataChart(dataLast)
  }


  useEffect(() => {
    if(range) analyzeData()
  }, [range])

  useEffect(() => {
    if(dataChart && labels) {
      createData()
    }
  }, [dataChart, labels])

  const createData = () => {
    const dataContent = {
      labels,
      datasets: [{
        label: `Last ${range} Days`,
        data: dataChart,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }],
    }
    setData(dataContent)
    
  }
  

  return (
    <>
      <div className='flex-col bg-white w-full h-full hover:shadow-xl p-4 rounded-xl'>
        <form id="addRate" className=' w-full justify-end flex'>
          <div className="flex flex-col justify-end mb-2">
            <p className="block text-md text-right text-gray-700 font-medium mb-2">Select a how many days</p>
            <div className="flex justify-between">
              <div className='flex gap-4'>
                <div>
                <RadioButton
                    role={range}
                    name="7"
                    setRole={setRange}
                  />
                </div>
                  
                <div>
                  <RadioButton
                    role={range}
                    name="30"
                    setRole={setRange}
                  />
                </div>
                 <div>
                 <RadioButton
                    role={range}
                    name="90"
                    setRole={setRange}
                  />
                 </div>
                 
              </div>
            </div>
          </div>

        </form>
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="absolute inset-0 flex-col h-full w-full overflow-auto">
            <div className="w-full h-auto">
              {data && labels
                ?
                <>
                  <Line options={options} data={data} />
                </>
                :
                <>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
