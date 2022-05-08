import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import "../styles/pages/dashboard-page.css";
import "../styles/logged-content-layout.css";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

export default function DashboardTeacher() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCourses(data);
    }
    loadData("courses");
  }, []);

  return (
    <div className="logged-in-body">
      <h2>Teacher Dashboard</h2>
      <div>
        <h3>Current Courses</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
              <Link to={"/courses/" + course.id + "/edit"}>
                <p>Edit course</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Other actions</h3>
        <Link to={"/create-course"}>
          <p>Create Course</p>
        </Link>
        <Link to={"/delete-course"}>
          <p>Delete Course</p>
        </Link>
      </div>
    </div>
  );
}
