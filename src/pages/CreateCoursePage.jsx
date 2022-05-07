import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { addDocumentWithId, getCollection } from "../scripts/fireStoreDB";
import form from "../data/create-course.json";
import textToUrl from "../scripts/textToUrl";
import urlToText from "../scripts/urlToText";

export default function CreateCoursePage() {
  const [courses, setCourses] = useState([]);

  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  // get courses
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCourses(data);
      setIsRefreshNeeded(false);
    }
    loadData("courses");
  }, [isRefreshNeeded]);

  async function onSubmit(event) {
    event.preventDefault();

    const formattedId = textToUrl(id);

    // check if input already exists in categories
    const maybeHasCourse = courses.find((course) => {
      if (course.id === formattedId) {
        return true;
      } else {
        return false;
      }
    });

    if (maybeHasCourse !== undefined) {
      alert("This course already exists!");
      console.error("This course already exists!");
      setIsSuccessful(false);
      resetForm();
      return;
    }

    const newCourse = {
      description: description,
    };

    try {
      await addDocumentWithId("courses", newCourse, formattedId);
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
      <h2>Create a new course</h2>
      <h3>Current courses:</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{urlToText(course.id)}</li>
        ))}
      </ul>

      {isSuccessful ? <p>Course created!</p> : null}

      <form onSubmit={onSubmit}>
        <InputField fieldInfo={form.id} state={[id, setId]} />
        <InputField
          fieldInfo={form.description}
          state={[description, setDescription]}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
