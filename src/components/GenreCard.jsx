import { Link } from "react-router-dom";

export default function GenreCard({ genre }) {
  const { id } = genre;

  return (
    <div className="card-item">
      <Link to={"/courses/" + id}>
        <p>{id}</p>
        <ul>
          <li key={id}>Test</li>
        </ul>
      </Link>
    </div>
  );
}
