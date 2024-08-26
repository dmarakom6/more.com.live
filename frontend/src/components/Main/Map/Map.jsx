import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import { useState, useEffect } from "react"
import eventInfo from "/public/info.json"

export default function Map(props) {

    const [center, setCenter] = useState([0, 0])

    var purpleDot = L.icon({
        iconUrl: 'icons/purpleDot.png',
        iconSize: [100, 100],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
    })

    var yellowDot = L.icon({
        iconUrl: 'icons/yellowDot.png',
        iconSize: [10, 10],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
    })

    var locationPin = L.icon({
        iconUrl: 'icons/location-pin.png',
        iconSize: [30, 30],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
    })


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCenter([pos.coords.latitude, pos.coords.longitude])
        });
    }, [])

    const venue_ids = eventInfo.map(event => event.event_info[0].venue_id)

    const venue_count = {};

    venue_ids.forEach(venue_id => {
        if (venue_count[venue_id]) {
            venue_count[venue_id]++;
        } else {
            venue_count[venue_id] = 1;
        }
    });

    const multiple_events = {};

    Object.keys(venue_count).forEach(venue_id => {
        multiple_events[venue_id] = venue_count[venue_id] > 1;
    });

    function getMarkers(eventArray) {
        return eventArray.map(event => {
            return (

                <Marker
                    eventHandlers={{
                        click: (e) => {
                            console.log([e.latlng['lat'], e.latlng['lng']]) //TODO useMap.flyTo to centralize the marker
                        }
                    }}
                    riseOnHover={true}
                    icon={multiple_events[event.event_info[0].venue_id] ? yellowDot : purpleDot}
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
            <Marker icon={locationPin} position={center} />
            {getMarkers(eventInfo)}


        </MapContainer>

    )
}
