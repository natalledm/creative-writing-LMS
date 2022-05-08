import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDocument } from "../scripts/fireStoreDB";
import urlToText from "../scripts/urlToText";
import "../styles/logged-content-layout.css";

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    async function loadData(path, courseId) {
      const courseDB = await readDocument(path, courseId);
      setCourse(courseDB);
    }
    loadData("courses", courseId);
  }, [courseId]);

  return (
    <div className="logged-in-body">
      <h2>{urlToText(courseId)} page</h2>
      <h3>Content:</h3>
      <p>{course.description}</p>
    </div>
  );
}
