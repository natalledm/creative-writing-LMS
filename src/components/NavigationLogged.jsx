import { Link } from "react-router-dom";
import home from "../assets/icons/home-white.png";
import pen from "../assets/icons/pen-white.png";
import calendar from "../assets/icons/calendar-white.png";
import hangouts from "../assets/icons/hangouts-white.png";
import slack from "../assets/icons/slack-white.png";
import logout from "../assets/icons/logout-white.png";
import "../styles/components/navigation-logged.css";

export default function NavigationLogged() {
  return (
    <nav className="navigation-container">
      <div className="navigation-content-container">
        <Link to={"/dashboard"}>
          <img
            src={home}
            alt="home icon, select to go back to homepage"
            title="home"
          />
        </Link>
        <Link to={"/dashboard"}>
          <img src={pen} alt="pen icon, go to courses" title="courses" />
        </Link>
        <Link to={"/dashboard"}>
          <img
            src={calendar}
            alt="calendar icon, open google calendar"
            title="calendar"
          />
        </Link>
        <Link to={"/dashboard"}>
          <img
            src={hangouts}
            alt="the google hangouts icon, open google hangouts"
            title="Google hangouts"
          />
        </Link>
        <Link to={"/dashboard"}>
          <img src={slack} alt="the slack icon, go to slack" title="Slack" />
        </Link>
        <Link to={"/"}>
          <img src={logout} alt="logout icon" title="logout" />
        </Link>
      </div>
    </nav>
  );
}
