import { useEffect } from 'react'
import { Marker, useMap } from 'react-leaflet'
import selfMarker from './../../../assets/markers/self.png'

function GetIcon() {
  return L.icon({
    iconUrl: selfMarker,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
}

export default function SelfMarker({ position }) {
  const map = useMap()

  useEffect(() => {
    map.setView([position[0] - 0.0007, position[1]], 17)
  }, [])

  return <Marker position={position} icon={GetIcon()} />
}
