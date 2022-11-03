import { Image, Menu } from "antd";
import "./FavoriteMovies.css";

export default function FavoriteMovies({ movies, x }) {
  const title = movies.Search?.find(
    (movie) => movie.imdbID === x.imdbID
  )?.Title;
  return (
    <Menu.Item key="FavoriteMovies" className="FavoriteMovies">
      <p>{title}</p>
      <Image
        preview={false}
        alt={`Image of ${title}`}
        width={20}
        height={20}
        src={movies.Search?.find((movie) => movie.imdbID === x.imdbID)?.Poster}
      />
    </Menu.Item>
  );
}
