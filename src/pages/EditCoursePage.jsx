import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editDocument, readDocument } from "../scripts/fireStoreDB";

export default function EditCoursePage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState({});

  const [description, setDescription] = useState("");
  const [isRefreshNedded, setIsRefreshNeeded] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    async function loadCourse(courseId) {
      const courseDB = await readDocument("courses", courseId);
      setCourse(courseDB);
      setDescription(courseDB.description);
      setIsRefreshNeeded(false);
    }
    loadCourse(courseId);
  }, [courseId, isRefreshNedded]);

  async function onSubmit(event) {
    event.preventDefault();

    const newData = {
      description: description,
      link: "abc",
    };

    try {
      await editDocument("courses", newData, courseId);
      setIsRefreshNeeded(true);
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsRefreshNeeded(false);
      setIsSuccessful(false);
    }
  }

  return (
    <div>
      <h2>Edit {courseId} course:</h2>
      {setIsSuccessful ? <p>Course updated!</p> : null}
      <form onSubmit={onSubmit}>
        <label>
          Description:
          <input
            type="textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
