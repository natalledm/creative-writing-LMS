import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { addDocumentWithId, getCollection } from "../scripts/fireStoreDB";
import form from "../data/create-course.json";
import textToUrl from "../scripts/textToUrl";
import urlToText from "../scripts/urlToText";
import "../styles/logged-content-layout.css";
import "../styles/pages/create-course.css";

// Component is too long!
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
    <div className="logged-in-body">
      <h2 className="create-course-title">Create a new course</h2>
      <div className="current-courses">
        <h3>Current courses:</h3>
        <ul className="current-courses-list">
          {courses.map((course) => (
            <li key={course.id}>{urlToText(course.id)}</li>
          ))}
        </ul>
      </div>

      {isSuccessful ? (
        <h3 className="course-created-title">Course created!</h3>
      ) : null}
      <div className="create-course-content">
        <h3>New course:</h3>
        <form onSubmit={onSubmit} className="create-course-form">
          <InputField fieldInfo={form.id} state={[id, setId]} />
          <InputField
            fieldInfo={form.description}
            state={[description, setDescription]}
          />
          <button className="main-button create-course-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
