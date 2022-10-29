import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { allMovies } from "../../Redux/slices/moviesSlice";
import { useSelector } from "react-redux";
import styles from "./MovieList.module.css";

const MovieList = () => {
  const movies = useSelector(allMovies);

  const movieList = movies.Search?.map((movie, index) => (
    <MovieCard key={index} movie={movie} />
  ));

  return (
    <div>
      <div className={styles.container}>{movieList}</div>
    </div>
  );
};

export default MovieList;
