import { useEffect, useState } from "react";
import { getCollection } from "../scripts/fireStoreDB";
import GenreCard from "../components/GenreCard";

export default function CurrentGenres() {
  const [genres, setGenres] = useState([]);

  // get genres/categories
  useEffect(() => {
    async function loadGenres(path) {
      const genresDB = await getCollection(path);
      setGenres(genresDB);
    }
    loadGenres("courses");
  }, []);

  return (
    <div>
      <h2>Current Genres:</h2>
      <p>Genre card with a list of its courses</p>
      {genres.map((genre) => (
        <li key={genre.id}>
          <GenreCard genre={genre} />
        </li>
      ))}
    </div>
  );
}
