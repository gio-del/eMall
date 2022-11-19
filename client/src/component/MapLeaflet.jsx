import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

export default function MapLeaflet() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  return (
    <div className="flex-grow">
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
        <Marker position={[latitude, longitude]}>
          <Popup>{latitude + ' ' + longitude}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
