import { Link } from "react-router-dom";
import logo from "../assets/icons/CW-logo.png";
import "../styles/components/navbar-not-logged.css";

export default function NavbarNotLogged() {
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="logo-title-container">
          <Link to={"/"}>
            <img
              src={logo}
              alt="Initials C and W that are the logo of the website"
              className="logo"
            />
          </Link>
        </div>
        <div className="list-container">
          <ul className="list">
            <li>
              <Link to={"/signup"}>Sign up</Link>
            </li>
            <li>
              <Link to={"/login"}>Log in</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
