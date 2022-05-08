import { useEffect, useState } from "react";
import { getCollection, deleteDocument } from "../scripts/fireStoreDB";
import "../styles/logged-content-layout.css";
import "../styles/pages/delete-course-page.css";

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
    <div className="logged-in-body">
      <h2>Choose a course to delete:</h2>
      <ul className="delete-course-list">
        {courses.map((course) => (
          <li key={course.id}>
            <button
              onClick={() => getClickedValue(course)}
              className="main-button"
            >
              {course.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
