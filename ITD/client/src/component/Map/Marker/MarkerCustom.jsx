import { Marker, useMap } from 'react-leaflet'

export default function MarkerCustom({
  id,
  setSelectedMarker,
  setIsDrawerOpen,
  icon,
  position,
}) {
  const map = useMap()

  function handleMapCentering() {
    map.flyTo([position[0] - 0.0007, position[1]], 17, { duration: 0.5 })
  }

  return (
    <Marker
      position={position}
      eventHandlers={{
        click: () => {
          setIsDrawerOpen(true)
          setSelectedMarker({
            id: id,
            latitude: position[0],
            longitude: position[1],
          })
          handleMapCentering()
        },
      }}
      icon={icon}
    />
  )
}
