import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { addDocument, getCollection } from "../scripts/fireStoreDB";
import form from "../data/create-course.json";

export default function CreateCourse() {
  const [courses, setCourses] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  // get courses
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCourses(data);
    }
    loadData("courses");
  }, [isRefreshNeeded]);

  async function onSubmit(event) {
    event.preventDefault();

    const newGenre = {
      name: name,
      description: description,
    };

    try {
      await addDocument("courses", newGenre);
      setIsSuccessful(true);
      setIsRefreshNeeded(true);
    } catch (error) {
      console.log("The error was:", error);
      setIsSuccessful(false);
    }
    resetForm();
  }

  function resetForm() {
    setName("");
    setDescription("");
  }

  return (
    <div>
      <h2>Create a new course</h2>
      <h3>Current courses:</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>

      {isSuccessful ? <p>Course created!</p> : null}

      <form onSubmit={onSubmit}>
        <InputField fieldInfo={form.name} state={[name, setName]} />
        <InputField
          fieldInfo={form.description}
          state={[description, setDescription]}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
