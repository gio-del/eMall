import Sheet from 'react-modal-sheet'
import { useState, useEffect } from 'react'

import './Drawer.css'
import DrawerContent from './DrawerContent'
import Booking from '../../Booking/Booking'
import { BASE_API } from '../../../constant'
import DirectionButtonUtility from '../../utilitycomponent/DirectionButtonUtility'

export default function Drawer({
  isOpen,
  setIsOpen,
  selectedMarker,
  currentLocation,
}) {
  const [details, setDetails] = useState([])
  const [booking, setBooking] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getConnectors()
  }, [selectedMarker])

  const getConnectors = async () => {
    if (!selectedMarker) return
    try {
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
      }}
      onClose={() => {
        setBooking(false)
        setIsOpen(false)
        setIsLoading(true)
        setDetails([])
      }}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="max-h-screen w-full">
              <div className="flex justify-between px-3">
                <div>
                  <p className="font-medium dark:text-tertiary text-dk-secondary">
                    {details.companyName}
                  </p>
                  <p className="font-light  dark:text-tertiary text-dk-secondary">
                    {details.address}
                  </p>
                </div>
                <DirectionButtonUtility
                  source={[currentLocation.latitude, currentLocation.longitude]}
                  destination={[
                    selectedMarker.latitude,
                    selectedMarker.longitude,
                  ]}
                />
              </div>
              {!booking ? (
                <DrawerContent
                  Connectors={details.connectors}
                  setBooking={setBooking}
                />
              ) : (
                <Booking
                  Connectors={details.connectors}
                  Date={'ok'}
                  id={selectedMarker.id}
                />
              )}
            </div>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
