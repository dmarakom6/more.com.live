import { useState } from "react"

import Map from "./Map/Map"
import EventDrawer from "./EventDrawer/EventDrawer"
import VenueDrawer from "./VenueDrawer/VenueDrawer"

export default function Main() {

    const [event, setEvent] = useState(undefined)
    const [venue, setVenue] = useState(undefined)

    function handleMarkerClick(item, type) {
        type === "venue" ? setVenue(item) : setEvent(item)

    }

    return (
        <>
            <Map handleMarkerClick={handleMarkerClick} />
            <EventDrawer event={event} />
            <VenueDrawer venue={venue} />
        </>
    )
}