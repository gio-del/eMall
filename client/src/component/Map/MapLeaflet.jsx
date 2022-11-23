import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from 'react-leaflet'
import MarkerClusterGroup from './Marker/MarkerClusterGroup'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchBar from './Search/SearchBar'
import Drawer from './Drawer/Drawer'
import MarkerCustom from './Marker/MarkerCustom'
import L from 'leaflet'
import blueMarker from './../../assets/markers/marker.svg'
import selfMarker from './../../assets/markers/self.png'
import SelfMarker from './Marker/SelfMarker'

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
    <div className="fixed">
      <div></div>
      <MapContainer
        zoomControl={false}
        style={{ height: 'calc(100vh - 4.5rem)', width: '100vw' }}
        center={[41.87, 12.56]}
        zoom={6}
        scrollWheelZoom={true}
        whenReady={(map) =>
          map.target.on('click', () => {
            setIsDrawerOpen(false)
          })
        }
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
        <ZoomControl position="bottomright" />
        <div className="absolute inset-x-0 bottom-4 items-center max-w-md mx-auto z-10">
          <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
        </div>
      </MapContainer>
      <div className="absolute z-10 md:w-2/3 lg:w-3/5 xl:w-2/5 w-full top-[0.5rem]">
        <SearchBar
          setChosenDate={setChosenDate}
          connectors={chosenConnectors}
          setConnectors={setChosenConnectors}
        />
      </div>
    </div>
  )
}
