import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  editDocument,
  readDocument,
  findStudentsByCourse,
} from "../scripts/fireStoreDB";
import { uploadFile } from "../scripts/cloudStorage";
import "../styles/logged-content-layout.css";
import "../styles/pages/edit-course-page.css";

export default function EditCoursePage() {
  const { courseId } = useParams();

  const [description, setDescription] = useState("");
  const [link, setLink] = useState({ link: "" });
  const [file, setFile] = useState({ name: "" });
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  const [isRefreshNedded, setIsRefreshNeeded] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    async function loadCourse(courseId) {
      // course related data
      const courseDB = await readDocument("courses", courseId);
      setDescription(courseDB.description);

      // students related data
      const enrolledStudentsDB = await findStudentsByCourse(courseId);
      setEnrolledStudents(enrolledStudentsDB);

      setIsRefreshNeeded(false);
    }
    loadCourse(courseId);
  }, [courseId, isRefreshNedded]);

  async function onSubmit(event) {
    event.preventDefault();

    const fileUrl = await uploadFile(`courses/${courseId}/${file.name}`, file);

    const newData = {
      description: description,
      link: [
        {
          linkUrl: link,
        },
      ],
      file: [
        {
          fileName: file.name,
          url: fileUrl,
        },
      ],
    };

    try {
      await editDocument("courses", newData, courseId);
      setIsRefreshNeeded(true);
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsRefreshNeeded(false);
      setIsSuccessful(false);
    }
  }

  function addFile(file) {
    const SIZE_LIMIT = 10 * 1024 * 1024;
    if (file.size > SIZE_LIMIT) {
      alert("File is bigger than 10mb, please choose a smaller file");
      return;
    }
    setFile(file);
  }

  function onFileChange(event) {
    event.preventDefault();
    addFile(event.target.files[0]);
  }

  async function removeStudent(event, student) {
    event.preventDefault();
    const studentId = student.id;
    const newFilteredArray = student.courses.filter((course) => {
      return course !== courseId;
    });

    const newData = {
      courses: newFilteredArray,
    };

    await editDocument("users", newData, studentId);
    setIsRefreshNeeded(true);
  }

  function showEnrolledStudents() {
    const students = enrolledStudents.map((student) => (
      <li className="student-enrolled">
        {student.fullName}
        <button
          onClick={(event) => removeStudent(event, student)}
          className="remove-button"
        >
          Remove
        </button>
      </li>
    ));

    return <ul>{students}</ul>;
  }

  return (
    <div className="logged-in-body edit-course-content">
      <h2>Edit {courseId} course:</h2>
      {isSuccessful ? (
        <h3 className="course-updated-title">Course updated!</h3>
      ) : null}
      <form onSubmit={onSubmit} className="edit-course-form">
        <label>
          Description:
          <input
            type="textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          File to upload:
          <input type="file" name={file.name} onChange={onFileChange} />
        </label>
        <label>
          Add a link:
          <input
            type="text"
            placeholder="Link to add"
            onChange={(event) => setLink(event.target.value)}
          />
        </label>
        <button className="main-button" id="submit-edit-button">
          Submit
        </button>
      </form>
      <h3>Students enrolled:</h3>
      {enrolledStudents.length > 0 ? (
        showEnrolledStudents()
      ) : (
        <p>There are no students enrolled in this course</p>
      )}
    </div>
  );
}
