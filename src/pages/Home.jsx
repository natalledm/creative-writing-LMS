import { Link } from "react-router-dom";
import bgImg from "../assets/images/home-aaron-burden-unsplash.png";
import "../styles/pages/home-page.css";

export default function Home() {
  return (
    <div className="homepage">
      <header
        className="header-container"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <h1 className="header-title">Creative Writing</h1>
        <h2 className="header-subtitle">Learning Management System</h2>
      </header>
      <section className="home-content">
        <div className="content-container">
          <p>Learn everything you want about Creative Writing with us!</p>
          <p>
            We offer courses about <strong>fiction</strong>,
            <strong> non-fiction</strong>,<strong> poetry</strong>, and
            <strong> copywriting</strong>. Each course has specialties and we
            are always improving to bring you the best experience.
          </p>
          <p>Enroll now for free!</p>
          <span className="main-button" id="home-signup-button">
            <Link to={"/singup"}>Sign up</Link>
          </span>
        </div>
      </section>
    </div>
  );
}
