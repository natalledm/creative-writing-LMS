import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import "../styles/pages/dashboard-page.css";
import "../styles/content-layout.css";

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
      <h1>Teacher Dashboard</h1>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.id}</li>
        ))}
      </ul>
    </div>
  );
}
