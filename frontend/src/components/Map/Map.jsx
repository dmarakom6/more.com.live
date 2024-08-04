import { MapContainer, TileLayer, Marker } from "react-leaflet"
import { useState, useEffect } from "react"
import eventInfo from "../../../public/info.json"

export default function Map() {

    const [center, setCenter] = useState([0,0])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCenter([pos.coords.latitude, pos.coords.longitude])
        });
    },[])

    function getMarkers(eventArray) {
        return eventArray.map(event => {
            return (
                <Marker 
                key={event.event_info[event.event_info.length - 1].event_id}
                position={[event.event_info[event.event_info.length - 1].latitude, 
                event.event_info[event.event_info.length - 1].longitude]}
                />
            )
        })
    }

    return (
        <MapContainer key={center.join("")} id="eventsMap" center={center} zoom={12} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}></Marker>
            {getMarkers(eventInfo)}


        </MapContainer>

    )
}

