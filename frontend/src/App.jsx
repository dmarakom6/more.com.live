import Map from "./components/Map"
import EventDrawer from "./components/EventDrawer"
import 'leaflet/dist/leaflet.css';

function App() {

    return (
        <>
            <EventDrawer events={false} />
            <EventDrawer events={true} />
            <Map />
        </>
    )
}
export default App
