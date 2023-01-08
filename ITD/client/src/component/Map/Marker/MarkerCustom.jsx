import { Marker, useMap } from 'react-leaflet'

export default function MarkerCustom({ setIsDrawerOpen, icon, position }) {
  const map = useMap()

  function handleMapCentering() {
    map.flyTo([position[0] - 0.0007, position[1]], 17, { duration: 0.5 })
  }

  return (
    <Marker
      position={position}
      eventHandlers={{
        click: () => {
          handleMapCentering()
          setIsDrawerOpen(() => true)
        },
      }}
      icon={icon}
    />
  )
}
