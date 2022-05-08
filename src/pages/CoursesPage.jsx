import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import CourseCard from "../components/CourseCard";
import "../styles/logged-content-layout.css";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  // get courses
  useEffect(() => {
    async function loadCourses(path) {
      const coursesDB = await getCollection(path);
      setCourses(coursesDB);
    }
    loadCourses("courses");
  }, []);

  return (
    <div className="logged-in-body">
      <h2>All Courses:</h2>
      {courses.map((course) => (
        <li key={course.id}>
          <CourseCard course={course} />
        </li>
      ))}
    </div>
  );
}
