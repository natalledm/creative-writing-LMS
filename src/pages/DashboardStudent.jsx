import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import "../styles/pages/dashboard-page.css";
import "../styles/logged-content-layout.css";

export default function DashboardStudent() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      console.log(data);
      setCourses(data);
    }
    loadData("courses");
  }, []);

  return (
    <div className="logged-in-body">
      <h1>Student Dashboard</h1>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.id}</li>
        ))}
      </ul>
    </div>
  );
}
