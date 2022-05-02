// project file
import { firebaseAuth } from "./connectToFirebase";

// packages
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function createUser(email, password) {
  const credentials = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );

  return credentials.user.uid;
}

export async function loginUser(email, password) {
  const credentials = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );

  return credentials.user.uid;
}

export async function recoverUser(email) {
  await sendPasswordResetEmail(firebaseAuth, email);
  return "Email sent!";
}
