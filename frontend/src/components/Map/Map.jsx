import { MapContainer, TileLayer } from "react-leaflet"


export default function Map() {
    return (
        <MapContainer id="eventsMap" center={[37.9756, 23.7346]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>

    )
}

