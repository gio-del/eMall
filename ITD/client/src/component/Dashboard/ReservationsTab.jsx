import { useState, useEffect } from 'react'
import TabSelectorDash from '../utilitycomponent/TabSelectorDash'
import { BASE_API } from '../../constant'

export default function ReservationsTab({ evcpList }) {
  const [currentEvcp, setCurrentEvcp] = useState()
  const [reservations, setReservations] = useState()

  const getData = async () => {
    if (!currentEvcp) return
    try {
      const response = await fetch(
        `${BASE_API}/cpo/book/${currentEvcp.evcpID}`,
        {
          credentials: 'include',
        },
      )
      if (response.status === 200) {
        const jsonData = await response.json()
        console.log(jsonData)
        setReservations(jsonData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [currentEvcp])

  useEffect(() => {
    if(evcpList) {
      setCurrentEvcp(evcpList[0])
    }
  }, [])

  return (
    <>
      <div className='md:flex md:justify-between md:mt-8 h-[calc(100%-10rem)] overflow-y-scroll'>
        <div className='w-1/4 md:mx-8'>
          <TabSelectorDash
            tabs={evcpList}
            currentTab={currentEvcp}
            setCurrentTab={setCurrentEvcp}
          />
        </div>
        <div className='w-full mx-8'>
        <div className='bg-white rounded-xl w-full p-4 h-auto'>
          <table className='table-auto w-full text-left text-dash-black'>
            <thead className='bg-dash-gray text-md text-dash-gray-dark uppercase'>
              <tr>
                <th className='px-6 py-3'>ID</th>
                <th className='px-6 py-3'>From</th>
                <th className='px-6 py-3'>To</th>
                <th className='px-6 py-3'>Total Price</th>
                <th className='px-6 py-3'>Socket ID</th>
              </tr>
            </thead>
            <tbody>
              {reservations &&
                reservations.map((reservation) => (
                  <>
                    <tr className='border-b border-dash-gray'>
                      <td className='px-6 py-4 font-medium text-dash-gray-dark whitespace-nowrap'>{reservation.reservationID}</td>
                      <td className='px-6 py-4'>{`${new Date(reservation.timeFrom).getUTCDate()}-${new Date(reservation.timeFrom).getUTCMonth()}-${new Date(reservation.timeFrom).getUTCFullYear()} : ${new Date(reservation.timeFrom).getHours()}:${new Date(reservation.timeFrom).getMinutes()}`}</td>
                      <td className='px-6 py-4'>{`${new Date(reservation.timeTo).getUTCDate()}-${new Date(reservation.timeTo).getUTCMonth()}-${new Date(reservation.timeTo).getUTCFullYear()} : ${new Date(reservation.timeTo).getHours()}:${new Date(reservation.timeTo).getMinutes()}`}</td>
                      <td className='px-6 py-4'>{reservation.totalPrice}</td>
                      <td className='px-6 py-4'>{reservation.socketID}</td>
                    </tr>
                    <span></span>
                  </>))}
            </tbody>
          </table>

        </div>
        </div>
        
      </div>
      
    </>
  )
}
