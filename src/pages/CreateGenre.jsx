import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { addDocumentWithId, getCollection } from "../scripts/fireStoreDB";
import form from "../data/create-genre.json";

export default function CreateGenre() {
  const [genres, setGenres] = useState([]);

  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  // get genres/categories
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setGenres(data);
    }
    loadData("courses");
  }, [isRefreshNeeded]);

  async function onSubmit(event) {
    event.preventDefault();

    // check if input already exists in categories
    const maybeHasGenre = genres.find((genre) => {
      if (genre.id === id.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    });

    if (maybeHasGenre !== undefined) {
      alert("This genre already exists!");
      console.error("This genre already exists!");
      setIsSuccessful(false);
      resetForm();
      return;
    }

    const newGenre = {
      description: description,
    };

    try {
      await addDocumentWithId("courses", newGenre, id.toLowerCase());
      setIsSuccessful(true);
      setIsRefreshNeeded(true);
    } catch (error) {
      console.log("The error was:", error);
      setIsSuccessful(false);
    }
    resetForm();
  }

  function resetForm() {
    setId("");
    setDescription("");
  }

  return (
    <div>
      <h2>Create a new genre</h2>
      <h3>Current genres:</h3>
      <ul>
        {genres.map((course) => (
          <li key={course.id}>{course.id}</li>
        ))}
      </ul>

      {isSuccessful ? <p>Genre created!</p> : null}

      <form onSubmit={onSubmit}>
        <InputField fieldInfo={form.name} state={[id, setId]} />
        <InputField
          fieldInfo={form.description}
          state={[description, setDescription]}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
