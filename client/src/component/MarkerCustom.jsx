import { Marker, useMap } from "react-leaflet"

export default function MarkerCustom({setActualCenter,setIsDrawerOpen}) {
  const map = useMap()

  function handleMapCentering() {
    setActualCenter({
        latitude: 45.48378165505682,
        longitude: 9.21783171280132,
      })
    map.setView([45.48378165505682-0.0007, 9.21783171280132],18)
  }

  return (
    <Marker
      position={[45.48378165505682, 9.21783171280132]}
      eventHandlers={{
        click: () => {
          handleMapCentering()
          setIsDrawerOpen(() => true)
        },
      }}
    ></Marker>
  )
}
