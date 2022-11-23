import { useEffect } from 'react'
import { Marker, useMap } from 'react-leaflet'

export default function SelfMarker({ position, icon }) {
  const map = useMap()

  useEffect(() => {
    map.setView([position[0] - 0.0007, position[1]], 17)
  }, [])

  return <Marker position={position} icon={icon} />
}
