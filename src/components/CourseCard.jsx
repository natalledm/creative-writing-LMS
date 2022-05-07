import { Link } from "react-router-dom";
import textToUrl from "../scripts/textToUrl";

export default function CourseCard({ course }) {
  const { name } = course;

  const nameUrl = textToUrl(name);

  return (
    <div className="course-item">
      <Link to={"/courses/" + nameUrl}>
        <p>{name}</p>
      </Link>
    </div>
  );
}
