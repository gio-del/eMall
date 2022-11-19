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
import SearchBar from './SearchBar';

  return (
    <div>
         <div>
            <div class="w-full h-screen bg-gray-200 flex justify-center items-center">
                <div class="bg-gray-400 w-full h-full relative z-0">
                    <MapContainer
                        style={{ height: '100vh'}}
                        center={[41.87, 12.56]}
                        zoom={6}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[41.87, 12.56]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                    <div class="absolute inset-x-0 top-4 items-center max-w-md mx-auto z-10">
                        <SearchBar/>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
}
