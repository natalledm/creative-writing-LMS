import { Link } from "react-router-dom";
import urlToText from "../scripts/urlToText";

export default function CourseCard({ course }) {
  const { id } = course;

  const idToText = urlToText(id);

  return (
    <div className="course-item">
      <Link to={"/courses/" + id}>
        <p>{idToText}</p>
      </Link>
    </div>
  );
}
