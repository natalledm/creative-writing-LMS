import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import { useUserId } from "../state/UserIdContext";
import CourseCard from "../components/CourseCard";
import { editDocument } from "../scripts/fireStoreDB";
import "../styles/pages/dashboard-page.css";
import "../styles/logged-content-layout.css";

export default function DashboardStudent() {
  const { userId, userInfo } = useUserId();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [isRefreshNeeded, setIsRefreshNeeded] = useState(false);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      setCourses(data);
    }
    loadData("courses");
  }, []);

  useEffect(() => {
    const newEnrolledCourses = courses.filter((course) => {
      const courseId = course.id;
      const index = userInfo.courses.indexOf(courseId);

      return index !== -1;
    });
    setEnrolledCourses(newEnrolledCourses);

    const newAvailableCourses = courses.filter((course) => {
      const courseId = course.id;
      const index = userInfo.courses.indexOf(courseId);

      return index === -1;
    });

    setAvailableCourses(newAvailableCourses);
    setIsRefreshNeeded(false);
  }, [courses, userInfo, isRefreshNeeded]);

  async function onEnroll(event, course) {
    event.preventDefault();
    // update local userInfo
    userInfo.courses.push(course.id);
    // update on db
    await editDocument("users", userInfo, userId);
    setIsRefreshNeeded(true);
  }

  return (
    <div className="logged-in-body">
      <h2>Student Dashboard</h2>
      <h3>My Courses</h3>
      <ul>
        {enrolledCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ul>
      <h3>Available Courses</h3>
      <ul>
        {availableCourses.map((course) => (
          <div>
            <CourseCard key={course.id} course={course} />

            <button onClick={(event) => onEnroll(event, course)}>Enroll</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
