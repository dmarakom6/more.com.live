import Header from "./components/Header"
import Main from "./components/Main"
import FilterModal from "./components/FilterModal"
import 'leaflet/dist/leaflet.css';

function App() {

    return (
        <>
            <Header>
                <FilterModal />
            </Header>
            <Main />
        </>
    )
}
export default App
