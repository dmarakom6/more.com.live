import { useState } from "react"

import Map from "./Map/Map"
import EventDrawer from "./EventDrawer/EventDrawer"

export default function Main() {

    const [isOpen, setIsOpen] = useState(false)

    function handleMarkerClick() {
        console.log("HI!")
    }

    return (
        <>
            <Map handleMarkerClick={handleMarkerClick} />
            <EventDrawer isOpen={isOpen} />
        </>
    )
}