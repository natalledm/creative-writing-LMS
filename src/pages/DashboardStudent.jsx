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
    <div className="logged-in-body dashboard-page-content">
      <h2 className="dashboard-main-title">Student Dashboard</h2>
      <div>
        <h3 className="dashboard-secondary-title">My Courses</h3>
        <ul className="courses-list">
          {enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      </div>
      <div>
        <h3 className="dashboard-secondary-title">Available Courses</h3>
        <ul className="courses-list">
          {availableCourses.map((course) => (
            <div className="available-courses-list">
              <CourseCard key={course.id} course={course} />
              <button
                onClick={(event) => onEnroll(event, course)}
                className="main-button"
                id="enroll-button"
              >
                Enroll
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
