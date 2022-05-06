import { Link } from "react-router-dom";
import "../styles/not-logged-content-layout.css";
import "../styles/pages/not-logged-page.css";

export default function NotLogged() {
  return (
    <div className="not-logged-body not-logged-container">
      <h2 className="not-logged-title">Sorry, you are not logged in :(</h2>
      <p>Please login or create an account to access our courses!</p>
      <div className="not-logged-buttons">
        <Link to="/login" className="main-button">
          Login
        </Link>
        <Link to="/signup" className="main-button">
          Sign up
        </Link>
      </div>
      <div>
        <Link to="/" className="not-logged-link cancel-back-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
