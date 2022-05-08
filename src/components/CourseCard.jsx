import { Link } from "react-router-dom";
import urlToText from "../scripts/urlToText";
import "../styles/components/course-card.css";

export default function CourseCard({ course }) {
  const { id } = course;

  const idToText = urlToText(id);

  return (
    <div className="course-card">
      <Link to={"/courses/" + id}>
        <p>{idToText}</p>
      </Link>
    </div>
  );
}
