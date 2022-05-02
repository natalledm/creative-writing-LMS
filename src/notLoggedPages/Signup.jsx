import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div>
      <h1>Create an account</h1>
      <form>
        <label>
          Name:
          <input type="text" placeholder="Name" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="E-mail" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="E-mail" />
        </label>
        <button>Create account</button>
      </form>
      <h3>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </h3>
    </div>
  );
}
