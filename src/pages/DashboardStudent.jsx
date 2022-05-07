import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import { useUserId } from "../state/UserIdContext";
import CourseCard from "../components/CourseCard";
import { editDocument } from "../scripts/fireStoreDB";
import "../styles/pages/dashboard-page.css";
import "../styles/logged-content-layout.css";

export default function DashboardStudent() {
  const { userId, userInfo } = useUserId();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCourses(data);
    }
    loadData("courses");
  }, []);

  async function onEnroll(event, course) {
    event.preventDefault();
    // update local userInfo
    userInfo.courses.push(course.id);
    // update on db
    await editDocument("users", userInfo, userId);
  }

  return (
    <div className="logged-in-body">
      <h2>Student Dashboard</h2>
      <h3>Courses</h3>
      <ul>
        {courses.map((course) => (
          <div>
            <CourseCard key={course.id} course={course} showEnroll={true} />

            <button onClick={(event) => onEnroll(event, course)}>Enroll</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
