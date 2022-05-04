import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserId } from "../state/UserIdContext";
import { loginUser } from "../scripts/firebaseAuthentication";

export default function Login() {
  // global state
  const { login } = useUserId();

  // local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const uid = await loginUser(email, password);
      login(uid);
      onSuccess();
    } catch (error) {
      alert(`Error: Wrong password or email! Error message: ${error}`);
    }
    resetForm();
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  function onSuccess() {
    navigation("/dashboard");
  }

  return (
    <div>
      <h1>Login to access the courses</h1>
      <form onSubmit={onSubmit}>
        <label>
          E-mail:
          <input
            type="email"
            placeholder="Enter e-mail"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </label>
        <button>Login</button>
      </form>
      <p>
        Need an account? <Link to={"/signup"}>Sign up</Link>
      </p>
      <p>
        Forgot your password?{" "}
        <Link to={"/recover-password"}>Recover Password</Link>
      </p>
    </div>
  );
}
