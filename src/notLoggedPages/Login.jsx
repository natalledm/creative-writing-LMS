import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>Login to access the courses</h1>
      <form>
        <label>
          Email:
          <input type="email" placeholder="E-mail" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="E-mail" />
        </label>
        <button>Login</button>
      </form>
      <h3>
        Need an account? <Link to={"/signup"}>Sign up</Link>
      </h3>
    </div>
  );
}
