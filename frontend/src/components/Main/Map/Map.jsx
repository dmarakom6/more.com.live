import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import L from "leaflet"
import { useState, useEffect } from "react"
// import eventInfo from "/public/info.json"
import { get_unique_venues } from "../../../util/events"

export default function Map(props) {


    const [venueInfo, setVenueInfo] = useState([]);
    useEffect(() => {
        fetch("https://more-com-live.fly.storage.tigris.dev/info.json")
            .then(response => response.json())
            .then(eventInfo => setVenueInfo(get_unique_venues(eventInfo)))
    }, [])

    const [center, setCenter] = useState([0, 0])

    var purpleDot = L.icon({
        iconUrl: 'icons/purpleDot.png',
        iconSize: [100, 100]
    })

    var yellowDot = L.icon({
        iconUrl: 'icons/yellowDot.png',
        iconSize: [10, 10]
    })

    var locationPin = L.icon({
        iconUrl: 'icons/location-pin.png',
        iconSize: [30, 30]
    })


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCenter([pos.coords.latitude, pos.coords.longitude])
        });
    }, [])

    function getMarkers(venueInfo) {
        return venueInfo.map(venue => {
            try {
                venue.groups.map(group => group.distance = (L.latLng({ lat: venue.latitude, lng: venue.longitude }).distanceTo(L.latLng({ lat: center[0], lng: center[1] })) / 1000).toFixed(2)) // calculate distance to each venue
                const type = venue.groups.length > 1 ? "venue" : "event"
                const item = type === "venue" ? venue : { "latitude": venue.latitude, "longitude": venue.longitude, ...venue.groups[0] }

                return venue.latitude !== 0 && venue.longitude !== 0 && (
                    <Marker
                        eventHandlers={{
                            click: (v) => {
                                console.log([v.latlng['lat'], v.latlng['lng']], center) //TODO useMap.flyTo to centralize the marker
                                props.handleMarkerClick(item, type)
                            }
                        }}
                        riseOnHover={true}
                        icon={type === "venue" ? yellowDot : purpleDot}
                        key={venue.venue_id}
                        position={[
                            venue.latitude,
                            venue.longitude
                        ]
                        }
                    >
                        <Tooltip>{type === "venue" ? `${item.groups[0].event_title} +${item.groups.length - 1}` : item.event_title}</Tooltip>
                    </Marker>
                )
            } catch {
                console.log(venue)
            }
        })
    }

    return (
        <MapContainer key={center.join("")} id="eventsMap" center={center} zoom={12} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={locationPin} position={center} />
            {getMarkers(venueInfo)}


        </MapContainer>

    )
}

