import React from "react";
import { Button, Card } from "antd";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";
import { addFovoriteMovies } from "../../Redux/slices/moviesSlice";
import { useDispatch } from "react-redux";

function MovieCard({ movie }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const addToFavorite = (movie) => {
    dispatch(addFovoriteMovies(movie));
  };

  return (
    <Card
      className={styles.card}
      hoverable
      cover={<img alt="movie" src={movie.Poster} height={260} />}
    >
      <div className={styles.card_content}>
        <p className={styles.title}>{movie.Title}</p>
        <p>{movie.Year}</p>
        <p>{movie.Type}</p>

        <Button
          className={styles.btn}
          type="link"
          onClick={() => addToFavorite(movie)}
          movie={movie}
        >
          Add To Favorite
        </Button>
        <Button
          className={styles.btn}
          type="link"
          onClick={() => onClick(movie)}
        >
          Movie Detail
        </Button>
      </div>
    </Card>
  );
}

export default MovieCard;
