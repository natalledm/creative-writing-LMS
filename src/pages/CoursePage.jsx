import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDocument } from "../scripts/fireStoreDB";
import urlToText from "../scripts/urlToText";
import "../styles/logged-content-layout.css";
import "../styles/pages/course-page.css";

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

  // mmm... you have a course.link.map this is an array. Then why I can only add 1 link per course???
  function showLink() {
    const links = course.link.map((link) => {
      return (
        <li>
          <a href={link.linkUrl}>{link.linkUrl}</a>
        </li>
      );
    });

    return <ul>{links}</ul>;
  }

  // mmm... you have a course.link.map this is an array. Then why I can only add 1 link per course???
  function showFile() {
    const fileDownload = course.file.map((file) => {
      return (
        <li>
          <a href={file.url}>{file.fileName}</a>
        </li>
      );
    });

    return <ul>{fileDownload}</ul>;
  }

  return (
    <div className="logged-in-body">
      <h2 className="course-page-title">{urlToText(courseId)} page</h2>
      <div className="course-page-content">
        <h2>Content:</h2>
        <h3>About:</h3>
        <p>{course.description}</p>
        <h3>File and Link:</h3>
        {/* Nesting -1 */}
        <div className="file-link-list-container">
          {course.file !== undefined ? (
            showFile()
          ) : (
            <p>There is no file yet.</p>
          )}
        </div>
        {/* Nesting -1 */}
        <div className="file-link-list-container">
          {course.link !== undefined ? (
            showLink()
          ) : (
            <p>There is no link yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
