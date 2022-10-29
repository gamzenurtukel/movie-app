import MovieList from "../MovieList/MovieList";
import styles from "./Home.module.css";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

function Home({ pageCurrent }) {
  const navigate = useNavigate();
  const onChange = (page) => {
    const search =
      new URLSearchParams(window.location.search).get("search") || "harry";
    const params = new URLSearchParams({ page, search });
    navigate({
      pathname: "/",
      search: `?search=${params.get("search")}&page=${params.get("page")}`,
    });
  };

  return (
    <div>
      <div className={styles.home_content}>
        <MovieList />
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={pageCurrent}
          onChange={onChange}
          total={100}
        />
      </div>
    </div>
  );
}

export default Home;
