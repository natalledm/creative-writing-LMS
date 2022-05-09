import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";
import "../styles/pages/dashboard-page.css";
import "../styles/pages/dashboard-teacher-page.css";
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
    <div className="logged-in-body dashboard-page-content">
      <h2 className="dashboard-main-title">Teacher Dashboard</h2>
      <div>
        <h3 className="dashboard-secondary-title">Current Courses</h3>
        <ul className="courses-list teacher-edit-courses-list">
          {/* This part does not convince me, forget about a second about the nesting */}
          {/* It would not be cleaner to have this as a separate object, like CourseCardTeacher than builds on top of CourseCard? */}
          {courses.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
              <Link
                to={"/courses/" + course.id + "/edit"}
                className="main-button"
              >
                Edit course
              </Link>
            </li>
          ))}
          <li className="create-course-list-item">
            <Link to={"/create-course"} className="create-course-link">
              + Create New Course
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="dashboard-secondary-title">Other actions</h3>
        <div className="teacher-other-actions">
          <Link to={"/delete-course"} className="main-button">
            Delete Course Page
          </Link>
        </div>
      </div>
    </div>
  );
}
