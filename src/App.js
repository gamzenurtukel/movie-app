import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import MovieHeader from "./components/Header/MovieHeader";
import MovieFooter from "./components/Footer/MovieFooter";
import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAsyncMovies } from "./Redux/slices/moviesSlice";

function App() {
  const { Header, Footer, Content } = Layout;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && !location.search) {
      navigate({
        pathname: "/",
        search: "?search=harry&page=1",
      });
    }
  });

  const [search, setSearch] = useState(
    () => new URLSearchParams(location.search).get("search") || "harry"
  );

  const [pageCurrent, setPageCurrent] = useState(
    () => new URLSearchParams(location.search).get("page") || 1
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchAsyncMovies({
        search: new URLSearchParams(location.search).get("search"),
        page: new URLSearchParams(location.search).get("page"),
      })
    );
  }, [dispatch, pageCurrent, search, location.search]);

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          {
            <MovieHeader
              setSearch={setSearch}
              setPageCurrent={setPageCurrent}
            />
          }
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/" element={<Home pageCurrent={pageCurrent} />} />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Content>
        <Footer className="footer">{<MovieFooter />}</Footer>
      </Layout>
    </div>
  );
}

export default App;
