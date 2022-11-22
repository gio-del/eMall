import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from './MarkerClusterGroup'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchBar from './SearchBar'
import Drawer from './Drawer'
import MarkerCustom from './utilitycomponent/MarkerCustom'
import L from 'leaflet'
import blueMarker from './../assets/markers/marker.svg'
import selfMarker from './../assets/markers/self.png'
import SelfMarker from './utilitycomponent/SelfMarker'

function GetIcon(self) {
  return L.icon({
    iconUrl: self === true ? selfMarker : blueMarker,
    iconSize: [35, 45],
    iconAnchor: [17, 37],
  })
}

export default function MapLeaflet() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [chosenDate, setChosenDate] = useState(new Date())
  const [chosenConnectors, setChosenConnectors] = useState([])
  const [isGPSok, setGPSok] = useState(false)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setGPSok(true)
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
        {isGPSok && ( //if GPS ok then place a SelfMarker
          <SelfMarker position={[latitude, longitude]} icon={GetIcon(true)} />
        )}

        <MarkerCustom
          setIsDrawerOpen={setIsDrawerOpen}
          icon={GetIcon(false)}
          position={[45.48378165505682, 9.21783171280132]}
        />
        <MarkerCustom
          setIsDrawerOpen={setIsDrawerOpen}
          icon={GetIcon(false)}
          position={[47.48378165505682, 9.21783171280132]}
        />

        <div className="flex items-center justify-center">
          <div className="absolute top-4 z-10 md:w-1/2 lg:w-3/5 xl:w-2/5 w-full left-0">
            <SearchBar setChosenDate={setChosenDate} connectors={chosenConnectors} setConnectors={setChosenConnectors} />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-4 items-center max-w-md mx-auto z-10">
          <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
        </div>
      </MapContainer>
    </div>
  )
}
