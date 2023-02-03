import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ActionButton from './ActionButton'
import ChartButton from './ChartButton'
import ReservationChart from './ReservationChart'
import { BASE_API } from '../../constant'

export default function OverviewTab() {
  const [evcpList, setEvcpList] = useState()
  const [earnings, setEarnings] = useState()
  const [totalEarning, setTotalEarning] = useState(false)
  const [allEvcps, setAllEvcps] = useState([])
  const [cpAvailable, setCpAvailable] = useState(false)

  const earningsButton = {
    title: 'Total earnings',
    subtitle: 'x reservations',
    content: `${totalEarning} €`,
    bottomTitle: '+ €1432 this week',
    svgType: 'shop',
    colorBGsvg: 'bg-dash-gray-dark',
  }

  const activeButton = {
    title: 'Active Charging Points',
    subtitle: 'now',
    bottomTitle: '3 more from the last week',
    svgType: 'cp',
    colorBGsvg: 'bg-dash-green',
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

  const getEvcps = async () => {
    try {
      const response = await fetch(`${BASE_API}/cpo/cp/`, {
        credentials: 'include',
      })

      if (response.status === 200) {
        const jsonData = await response.json()
        setEvcpList(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getOverviewData = async () => {
    try {
      const response = await fetch(`${BASE_API}/cpo/book/`, {
        credentials: 'include',
      })
      if (response.status === 200) {
        const jsonData = await response.json()
        const newJson = jsonData.filter((row) => row.profit > 0).map((row) => ({evcpID : row.evcpID , date : new Date(row.date), profit : row.profit}))
        newJson.map((row) => {
          row.date.setSeconds(0)
          row.date.setMinutes(0)
          row.date.setHours(0)
          row.date.setMilliseconds(0)
        })
        setEarnings(newJson)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getSingleEvcpData = async (evcpID) => {
    if (!evcpID) return
    try {
      const response = await fetch(`${BASE_API}/cpo/cp/${evcpID}`, {
        credentials: 'include',
      })
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log(jsonData)
        setAllEvcps(allEvcps => [...allEvcps, jsonData])
        return jsonData
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getCPsData = async () => {
    if(!evcpList) return
    evcpList.map(async (evcp) => (
      getSingleEvcpData(evcp.evcpID)
    ))    
  }

  const calculateAvailability = () => {
    if(!allEvcps) return
    let available = 0
    let total = 0
    allEvcps.map(evcp => evcp.cps.map(cp => cp.sockets.map((socket) => {
      console.log("HERE")
      if (socket.connected) {
        available = available + 1
        total = total + 1
        console.log(available, "/", total)
      } else {
        total = total + 1
        console.log(available, "/", total)
      }
    })))
      setCpAvailable(`${available}/${total}`)
  }


  useEffect(() => {
    if(earnings) {
      let total = 0
      earnings.map((row) => {
        if(row.profit) {
          total = total + parseFloat(row.profit)
        }
      })
      setTotalEarning(`${total} €`)     
    }
  }, [earnings])


  useEffect(() => {
    setTotalEarning()
    getOverviewData()
    getEvcps()
  }, [])

  useEffect(() => {
    if(allEvcps) {
      calculateAvailability()
    }
  }, [allEvcps])

  useEffect(() => {
    if(evcpList) {
      getCPsData()
    }
  }, [evcpList])


  return (
    <>
      <div className="flex  items-stretch py-3 px-5 w-full h-[94%] lg:h-[88%] overflow-y-scroll">
        <div className="grid max-lg:grid-cols-1 lg:grid-cols-4 w-full h-full gap-4">
          {totalEarning && totalEarning
            ?
            <>
              <Link to="./reservations" className='col-span-2 row-span-2'>
                <ActionButton background={'bg-black'} data={earningsButton} content={totalEarning} />
              </Link>
              {cpAvailable
                ?
                <>
                  <Link to="./charging-points" className='col-span-2 row-span-2'>
                    <ActionButton background={'bg-white'} data={activeButton} content={cpAvailable} />
                  </Link>
                </>
                :
                <></>
              }
              {earnings && earnings
                ?
                <>
                  <div className="lg:col-span-3 lg:row-span-6">

                    <ReservationChart earnings={earnings} />
                  </div>
                </>
                :
                <>
                </>
              }
              <div className="lg:row-span-3 max-lg:hidden">
                <ChartButton data={data} text={'Energy mix now'} />
              </div>
              <div className="lg:row-span-3 max-lg:hidden">
                <ChartButton data={data} text={'Energy mix this week'} />
              </div>
            </>
            :
            <>
            </>}

        </div>
      </div>
    </>
  )
}
