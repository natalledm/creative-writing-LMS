import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { recoverUser } from "../scripts/firebaseAuthentication";
import formInfo from "../data/recover-password.json";

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
    <div>
      <h1>Recover your password</h1>
      <p>
        Please write the email you used to created your account below so we can
        send you an email with instructions on how to reset and create a new
        password.
      </p>
      <p>
        <span>Attention:</span>
        Don't forget to check your spam folder!
      </p>
      <form onSubmit={onSubmit}>
        <InputField state={[email, setEmail]} fieldInfo={formInfo.email} />
        <button>Submit</button>
      </form>
      <p>
        Did you remembered your password?
        <Link to="/login">Go back to login</Link>
      </p>
      <p>
        Need an account? <Link to={"/signup"}>Sign up</Link>
      </p>
    </div>
  );
}
