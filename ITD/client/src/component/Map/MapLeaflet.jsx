import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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
import Control from 'react-leaflet-custom-control'
import LocateMeControl from './LocateMeControl'
import SelfMarker from './Marker/SelfMarker'
import './MapLeaflet.css'
import { BASE_API } from '../../constant'

function GetIcon() {
  return L.icon({
    iconUrl: blueMarker,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
  })
}

export default function MapLeaflet() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [currentLocation, setCurrentLocation] = useState({
    latitude: '45.458424',
    longitude: '9.1694971',
  })
  const [markers, setMarkers] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [chosenDate, setChosenDate] = useState(new Date())
  const [chosenConnectors, setChosenConnectors] = useState([])
  const [isGPSok, setGPSok] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState({
    id: 1,
    latitude: 40,
    longitude: 50,
  })

  const getMarkers = async () => {
    try {
      const response = await fetch(
        `${BASE_API}/driver/search?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`,
      )
      const jsonData = await response.json()
      setMarkers(jsonData)
    } catch (err) {
      console.error(err)
    }
  }

  const removeMarker = (id) => {
    setMarkers(markers.filter((marker) => marker.id !== id))
  }

  useEffect(() => {
    getMarkers()
  }, [currentLocation])

  const handleLocationChange = (newLocation) => {
    setCurrentLocation(newLocation)
  }

  const createClusterCustomIcon = (cluster) => {
    const count = cluster.getChildCount()
    let size = 'LargeXL'

    if (count < 10) {
      size = 'Small'
    } else if (count >= 10 && count < 100) {
      size = 'Medium'
    } else if (count >= 100 && count < 500) {
      size = 'Large'
    }
    const options = {
      cluster: `markerCluster${size}`,
    }

    return L.divIcon({
      html: `<div>
          <span class="markerClusterLabel bg-dk-primary p-2 rounded-full bg-opacity-60">${count}</span>
        </div>`,
      className: `${options.cluster}`,
    })
  }

  return (
    <div className="fixed">
      <MapContainer
        zoomControl={false}
        style={{
          height: 'calc(100vh - 3.4rem)',
          width: '100vw',
          position: 'relative',
        }}
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
        {isGPSok && <SelfMarker position={[latitude, longitude]}></SelfMarker>}
        <div className="absolute z-10 md:w-2/3 lg:w-3/5 xl:w-2/5 w-full top-[0.5rem]">
          <SearchBar
            setChosenDate={setChosenDate}
            connectors={chosenConnectors}
            setConnectors={setChosenConnectors}
            onLocationChange={handleLocationChange}
          />
        </div>
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
          {markers.map((marker) => (
            <MarkerCustom
              key={marker.evcpID}
              id={marker.evcpID}
              setSelectedMarker={setSelectedMarker}
              setIsDrawerOpen={setIsDrawerOpen}
              icon={GetIcon()}
              position={[marker.latitude, marker.longitude]}
              removeMarker={removeMarker}
            />
          ))}
        </MarkerClusterGroup>

        <div className="absolute inset-x-0 bottom-4 items-center max-w-md mx-auto z-10">
          <Drawer
            isOpen={isDrawerOpen}
            setIsOpen={setIsDrawerOpen}
            selectedMarker={selectedMarker}
            currentLocation={currentLocation}
          />
        </div>
        <Control prepend position="bottomright">
          <LocateMeControl
            setGPSok={setGPSok}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setCurrentLocation={setCurrentLocation}
          />
        </Control>
        <ZoomControl position="bottomright" className="zoomControl" />
      </MapContainer>
    </div>
  )
}
