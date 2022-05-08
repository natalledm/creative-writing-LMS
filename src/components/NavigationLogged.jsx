import { Link } from "react-router-dom";
import home from "../assets/icons/home-white.png";
import pen from "../assets/icons/pen-white.png";
import calendar from "../assets/icons/calendar-white.png";
import hangouts from "../assets/icons/hangouts-white.png";
import slack from "../assets/icons/slack-white.png";
import logoutIcon from "../assets/icons/logout-white.png";
import "../styles/components/navigation-logged.css";
import { useUserId } from "../state/UserIdContext";

export default function NavigationLogged() {
  const { logout, userId } = useUserId();

  function logOff() {
    logout(userId);
  }

  return (
    <nav className="navigation-container">
      <div className="navigation-content-container">
        <Link to={"/dashboard"}>
          <img
            src={home}
            alt="home icon, select to go back to dashboard"
            title="home"
          />
        </Link>
        <Link to={"/courses"}>
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
        <button onClick={logOff} className="button-logoff">
          <img src={logoutIcon} alt="logout icon" title="logout" />
        </button>
      </div>
    </nav>
  );
}
