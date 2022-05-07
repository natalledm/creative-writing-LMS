import { useEffect, useState } from "react";
import { getCollection, deleteDocument } from "../scripts/fireStoreDB";

export default function DeleteCoursePage() {
  const [courses, setCourses] = useState([]);
  const [isRefreshNedded, setIsRefreshNeeded] = useState(false);

  // get courses
  useEffect(() => {
    async function loadCourses(path) {
      const coursesDB = await getCollection(path);
      setCourses(coursesDB);
      setIsRefreshNeeded(false);
    }
    loadCourses("courses");
  }, [isRefreshNedded]);

  function getClickedValue(course) {
    if (window.confirm(`Do you really want to delete ${course.id}?`)) {
      deleteDocument("courses", course.id);
      alert(`${course.id} course deleted`);
      setIsRefreshNeeded(true);
    } else {
      console.log("not deleted");
    }
  }

  return (
    <div>
      <h2>Choose a course to delete:</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <button onClick={() => getClickedValue(course)}>{course.id}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
