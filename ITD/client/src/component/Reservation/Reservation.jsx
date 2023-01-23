import { useEffect, useState } from 'react'
import useWindowDimensions from '../Car/useWindowDimensions'
import { BASE_API } from '../../constant'
import Tab from './Tab'

export default function Reservation() {
  const { height, width } = useWindowDimensions()
  const [currentTab, setCurrentTab] = useState('Upcoming')

  const [pastReservations, setPastReservations] = useState()
  const [upcomingReservations, setUpcomingReservations] = useState()

  const getReservations = async () => {
    try {
      const response = await fetch(`${BASE_API}/driver/reserve/`, {
        credentials: 'include',
      })
      if (response.status === 200) {
        const newPastReservations = []
        const newUpcomingReservations = []

        const jsonData = await response.json()

        const now = new Date()
        now.setSeconds(0)
        jsonData.forEach((data) => {
          if (new Date(data.timeTo) > now) {
            newUpcomingReservations.push(data)
          } else newPastReservations.push(data)
        })
        setPastReservations(newPastReservations)
        setUpcomingReservations(newUpcomingReservations)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getReservations()
  }, [])
  return (
    <>
      <div className="flex flex-col">
        {upcomingReservations && currentTab === 'Upcoming' && (
          <Tab
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            reservations={upcomingReservations}
          />
        )}
        {pastReservations && currentTab === 'Past' && (
          <Tab
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            reservations={pastReservations}
          />
        )}
      </div>
    </>
  )
}
