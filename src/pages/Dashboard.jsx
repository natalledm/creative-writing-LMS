import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);
      console.log(data);
      setCourses(data);
      setStatus(1);
    }
    loadData("courses");
  }, []);

  if (status === 0) return <p>Loading...</p>;
  if (status === 2) return <p>Error!</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.id}</li>
        ))}
      </ul>
    </div>
  );
}
