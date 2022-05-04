import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserId } from "../state/UserIdContext";
import { loginUser } from "../scripts/firebaseAuthentication";
import InputField from "../components/InputField";
import formInfo from "../data/login-form.json";

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

    if (uid) onSuccess();

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
    <div>
      <h1>Login to access the courses</h1>
      <form onSubmit={onSubmit}>
        <InputField state={[email, setEmail]} fieldInfo={formInfo.email} />
        <InputField
          state={[password, setPassword]}
          fieldInfo={formInfo.password}
        />
        <button>Login</button>
      </form>
      <p>
        Need an account? <Link to={"/signup"}>Sign up</Link>
      </p>
      <p>
        Forgot your password?
        <Link to={"/recover-password"}>Recover Password</Link>
      </p>
    </div>
  );
}
