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

export default function ReservationChart() {
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
      <div className="relative flex items-center justify-center bg-white w-full hover:shadow-xl h-full rounded-xl p-4">
        <div className="absolute flex-col h-auto w-full overflow-auto">
          <div className="flex justify-center">
            <p className="font-semibold">Charging Earnings</p>
          </div>
          <div className="w-full h-full">
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
