// project file
import { firestoreDB } from "./connectToFirebase";

// packages
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

// Read
// all documents (genres)
export async function getCollection(path) {
  const collectionPath = collection(firestoreDB, path);
  const snapshot = await getDocs(collectionPath);
  const documents = snapshot.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });

  return documents;
}
// single document (ex: fantasy)
export async function readDocument(path, id) {
  const documentPath = doc(firestoreDB, path, id);
  const document = await getDoc(documentPath);

  return document.data();
}

// // find document through query
// export async function findDocument(array, key, operator, value) {
//   const searchTerm = query(array, where(key, operator, value));
//   const querySnapshot = await getDocs(searchTerm);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }

// Create document with firestore generated id

export async function addDocument(path, data) {
  const docPath = collection(firestoreDB, path);
  const newDocument = await addDoc(docPath, data);

  return newDocument.id;
}

// Create document with its id
export async function addDocumentWithId(path, data, customId) {
  const docLocation = collection(firestoreDB, path);
  await setDoc(doc(docLocation, customId), data);
  return true;
}

// Delete document

export async function deleteDocument(path, docId) {
  const document = doc(firestoreDB, path, docId);
  await deleteDoc(document);
}
