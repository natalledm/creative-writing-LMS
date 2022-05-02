import { useState } from "react";
import { Link } from "react-router-dom";

import { addDocumentWithId } from "../scripts/fireStoreDB";
import { createUser } from "../scripts/firebaseAuthentication";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  // const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const uid = await createUser(email, password);
      if (uid) {
        const userData = { fullName, email, role: "student", courses: [] };
        await addDocumentWithId("users", userData, uid);
        setIsSuccessful(true);
      }
    } catch (error) {
      console.log(error);
      setIsSuccessful(false);
    }
    resetForm();
  }

  function resetForm() {
    setFullName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <h1>Create an account</h1>
      <form onSubmit={onSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            placeholder="Full name"
            required
            onChange={(event) => setFullName(event.target.value)}
            value={fullName}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="password"
            required
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </label>
        <button>Create account</button>
      </form>
      <div>
        {isSuccessful ? (
          <h2 style={{ color: "red" }}>Account created</h2>
        ) : null}
      </div>
      <h3>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </h3>
    </div>
  );
}
