import { MapContainer, TileLayer,Marker, Popup, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

export default function MapLeaflet () {
    return (
        <div className='flex-grow'>
            <MapContainer 
                    style={{ height: '90vh', width: '100wh' }}
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
        </div>
        
    )
}