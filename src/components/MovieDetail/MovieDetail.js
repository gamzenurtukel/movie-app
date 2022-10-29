import { useEffect } from "react";
import { Col, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  movieDetail,
  fetchAsyncMoviesDetail,
  getPending,
  getError,
} from "../../Redux/slices/moviesSlice";
import styles from "./MovieDetail.module.css";
import Spinner from "../Spinner/Spinner";

function MovieDetail() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMoviesDetail(imdbID));
  }, [dispatch, imdbID]);

  const selectMovie = useSelector(movieDetail);
  const isPending = useSelector(getPending);
  const isError = useSelector(getError);

  if (isPending) return <Spinner />;
  if (isError) return <div>error</div>;

  function renderRatings() {
    return selectMovie.Ratings.map((rating, key) => (
      <span key={key}>
        {rating.Source}: {rating.Value}
      </span>
    ));
  }

  return (
    <div className={styles.container}>
      <Row>
        <Col span={6} className={styles.col1}>
          <Image src={selectMovie.Poster} width={200} />
          <br />
          <div>
            <span>Ratings </span>
            {renderRatings()}
          </div>
        </Col>
        <Col span={14} push={1} className={styles.col2}>
          <div className={styles.div}>
            <p>
              <span className={styles.span}>{selectMovie.Title}</span>
            </p>
            <p>
              <span className={styles.span}>Plot</span>
              <br />
              {selectMovie.Plot}
            </p>
            <p>
              <span>Released: </span>
              {selectMovie.Released}
            </p>
            <p>
              <span>Year: </span>
              {selectMovie.Year}
            </p>
            <p>
              <span>Director: </span>
              {selectMovie.Director}
            </p>
            <p>
              <span>Genre: </span>
              {selectMovie.Genre}
            </p>
            <p>
              <span>Country: </span>
              {selectMovie.Country}
            </p>
            <p>
              <span>Language: </span>
              {selectMovie.Language}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MovieDetail;
