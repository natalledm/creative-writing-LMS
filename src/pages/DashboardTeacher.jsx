import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import "../styles/pages/dashboard-page.css";
import "../styles/logged-content-layout.css";

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
      <h3>Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.id}</li>
        ))}
      </ul>
    </div>
  );
}
