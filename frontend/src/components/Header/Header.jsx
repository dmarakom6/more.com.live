import "./Header.css"
import logo from "./morelogo.jpg"

export default function Header({ children }) {

    return (
        <header className="header">

            <div className="header--container">
                <img className="header--logo" src={logo} ></img>
                <div className="header--buttons">{children}</div>
            </div>

        </header>
    )

}