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

  return (
    <>
      <TabSelectorDash
        tabs={evcpList}
        currentTab={currentEvcp}
        setCurrentTab={setCurrentEvcp}
      />
      <div>
        {reservations &&
          reservations.map((reservation) => (
            <p key={reservation.reservatioID}>{reservation.timeTo}</p>
          ))}
      </div>
    </>
  )
}
