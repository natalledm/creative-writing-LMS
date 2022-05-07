import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import CourseCard from "../components/CourseCard";

export default function CurrentCourses() {
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
    <div>
      <h2>Current Courses:</h2>
      {courses.map((course) => (
        <li key={course.id}>
          <CourseCard course={course} />
        </li>
      ))}
    </div>
  );
}
