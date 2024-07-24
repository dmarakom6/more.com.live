import Map from "./components/Map"
import EventDrawer from "./components/EventDrawer"
import FilterModal from "./components/FilterModal"
import 'leaflet/dist/leaflet.css';

function App() {

    return (
        <>
            <EventDrawer events={false} />
            <EventDrawer events={true} />
            <FilterModal />
            <Map />
        </>
    )
}
export default App
