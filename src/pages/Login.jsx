import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserId } from "../state/UserIdContext";
import { loginUser } from "../scripts/firebaseAuthentication";
import InputField from "../components/InputField";
import formInfo from "../data/login-form.json";
import "../styles/pages/login.css";
import "../styles/not-logged-content-layout.css";

export default function Login() {
  // global state
  const { login } = useUserId();

  // local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    const uid = await loginUser(email, password).catch(onFail);

    if (uid) onSuccess(uid);

    resetForm();
  }

  function onFail(error) {
    console.error(error);
    alert(`Error: Wrong password or email! Error message: ${error}`);
  }

  function onSuccess(uid) {
    login(uid);
    navigation("/dashboard");
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className="not-logged-body login-container">
      <h2 className="login-title">Login to access the courses</h2>
      <form onSubmit={onSubmit} className="login-form">
        <InputField state={[email, setEmail]} fieldInfo={formInfo.email} />
        <InputField
          state={[password, setPassword]}
          fieldInfo={formInfo.password}
        />
        <button className="main-button">Login</button>
      </form>
      <p>
        Need an account?
        <Link to={"/signup"} className="link-footer">
          Sign up
        </Link>
      </p>
      <p>
        Forgot your password?
        <Link to={"/recover-password"} className="link-footer">
          Recover Password
        </Link>
      </p>
      <p>
        <Link to={"/"} className="cancel-back-button link-button-back">
          Back to home
        </Link>
      </p>
    </div>
  );
}
