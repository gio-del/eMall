import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchBar from './SearchBar'
import Drawer from './Drawer'
import MarkerCustom from './MarkerCustom'

export default function MapLeaflet() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [actualCenter, setActualCenter] = useState({
    latitude: 41.87,
    longitude: 12.56,
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      (error) => {
        //alert(error.message)
      },
    )
  }, [])

  return (
    <div
      onClick={() => {
        if (isDrawerOpen === true) setIsDrawerOpen(true)
      }}
    >
      <MapContainer
        style={{ height: 'calc(100vh - 4.5rem)', width: '100vw' }}
        center={[41.87, 12.56]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*<Marker
          position={[latitude, longitude]}
          eventHandlers={{
            click: () =>
              alert('You clicked your home :) i should open the drawer'),
          }}
        >
          <Popup>{latitude + ' ' + longitude}</Popup>
        </Marker>*/}
        <MarkerCustom
          setActualCenter={setActualCenter}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <div className="absolute inset-x-0 top-4 items-center max-w-md mx-auto z-10">
          <SearchBar />
        </div>
        <div className="absolute inset-x-0 bottom-4 items-center max-w-md mx-auto z-10">
          <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
        </div>
      </MapContainer>
    </div>
  )
}
