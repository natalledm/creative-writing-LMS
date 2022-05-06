import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { recoverUser } from "../scripts/firebaseAuthentication";
import formInfo from "../data/recover-password.json";

import "../styles/not-logged-content-layout.css";
import "../styles/pages/recover-password-page.css";

export default function RecoverPassword() {
  const navigation = useNavigate();

  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    const result = await recoverUser(email).catch(onFail);

    if (result) onSuccess(email);
  }

  function onSuccess(email) {
    alert(
      `We sent an email to ${email}. Don't forget to check your spam folder too.`,
    );
    navigation("/login");
  }

  function onFail(error) {
    console.error(error);
    alert(error);
  }

  return (
    <div className="not-logged-body recover-container">
      <h2 className="recover-title">Recover your password</h2>
      <p>
        Please write the email you used to created your account below so we can
        send you an email with instructions on how to reset and create a new
        password.
      </p>
      <p>
        <strong>Attention: </strong>
        Don't forget to check your spam folder!
      </p>
      <form onSubmit={onSubmit} className="recover-form">
        <InputField state={[email, setEmail]} fieldInfo={formInfo.email} />
        <button className="main-button">Submit</button>
      </form>
      <p>
        Did you remembered your password?
        <Link to="/login" className="link-recover">
          Go back to login
        </Link>
      </p>
      <p>
        Need an account?{" "}
        <Link to={"/signup"} className="link-recover">
          Sign up
        </Link>
      </p>
    </div>
  );
}
