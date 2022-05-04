import { Link } from "react-router-dom";

export default function NotLogged() {
  return (
    <div>
      <h1>Sorry, you are not logged in :(</h1>
      <p>Please login or create an account to access our courses!</p>
      <Link to="/signup">Sign up</Link>
      <Link to="/login">Login</Link>
      <Link to="/recover-password">Recover Password</Link>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
