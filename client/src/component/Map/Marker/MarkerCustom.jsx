import { Marker, useMap } from 'react-leaflet'

export default function MarkerCustom({ setIsDrawerOpen, icon, position }) {
  const map = useMap()

  function handleMapCentering() {
    map.setView([position[0] - 0.0007, position[1]], 17)
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
