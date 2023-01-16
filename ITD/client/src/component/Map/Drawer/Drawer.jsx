import Sheet from 'react-modal-sheet'
import { useState } from 'react'
import './Drawer.css'
import DrawerContent from './DrawerContent'
import { BASE_API } from '../../../constant'
import { useEffect } from 'react'

export default function Drawer({ isOpen, setIsOpen, selectedMarker, currentLocation }) {
  const [details, setDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      onOpenStart={() => getConnectors()}
      onClose={() => setIsOpen(false)}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <DrawerContent
              CPOName={details.companyName}
              Address={details.address}
              Connectors={details.connectors}
              Source={{latitude: selectedMarker.latitude,longitude: selectedMarker.longitude}}
              Destination={{latitude: currentLocation.latitude,longitude: currentLocation.longitude}}
            />
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
