import Map from "./components/Map"
import Header from "./components/Header"
import EventDrawer from "./components/EventDrawer"
import FilterModal from "./components/FilterModal"
import 'leaflet/dist/leaflet.css';

function App() {

    return (
        <>
            <Header>
                <FilterModal />
            </Header>
            <EventDrawer events={false} />
            <EventDrawer events={true} />
            <Map />
        </>
    )
}
export default App
