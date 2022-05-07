// NPM packages
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";

// Project file
import { cloudStorage } from "./connectToFirebase";

// Upload file
export async function uploadFile(filePath, file) {
  const fileReference = ref(cloudStorage, filePath);

  await uploadBytes(fileReference, file);
  return await getDownloadURL(fileReference);
}

export async function deleteFile(filePath) {
  const fileReference = ref(cloudStorage, filePath);

  await deleteObject(fileReference);
  return "File deleted";
}
