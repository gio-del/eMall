import Sheet from 'react-modal-sheet'
import { useState, useEffect } from 'react'

import './Drawer.css'
import DrawerContent from './DrawerContent'
import Booking from '../../Booking/Booking'
import { BASE_API } from '../../../constant'

export default function Drawer({
  isOpen,
  setIsOpen,
  selectedMarker,
  currentLocation,
}) {
  const [details, setDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    getConnectors()
  }, [selectedMarker])

  const getConnectors = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BASE_API}/driver/search/${selectedMarker.id}`,
      )
      const jsonData = await response.json()
      setDetails(jsonData)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Sheet
      isOpen={isOpen}
      onOpenStart={() => {
        setBooking(false)
        getConnectors()
      }}
      onClose={() => setIsOpen(false)}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {isLoading ? (
            <div>Loading...</div>
          ) : !booking ? (
            <DrawerContent
              CPOName={details.companyName}
              Address={details.address}
              Connectors={details.connectors}
              Source={{
                latitude: selectedMarker.latitude,
                longitude: selectedMarker.longitude,
              }}
              Destination={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              setBooking={setBooking}
            />
          ) : (
            <Booking
              CPOName={details.companyName}
              Address={details.address}
              Connectors={details.connectors}
              Date={'ok'}
            />
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
