import React from "react";
import { Menu } from "antd";
import { Input } from "antd";
import { Link } from "react-router-dom";
import styles from "./MovieHeader.module.css";
import { StarFilled } from "@ant-design/icons";
import { favoriteList, allMovies } from "../../Redux/slices/moviesSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";

const { Search } = Input;

function MovieHeader() {
  const fovoriteMovies = useSelector(favoriteList);
  const movies = useSelector(allMovies);
  const navigate = useNavigate();

  const onSearch = (value) => {
    const page = new URLSearchParams(window.location.search).get("page") || 1;
    const params = new URLSearchParams({ value, page });
    navigate({
      pathname: "/",
      search: `?search=${params.get("value")}&page=${params.get("page")}`,
    });
  };

  return (
    <div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="link">
          <Link to="/">Movie App</Link>
        </Menu.Item>

        <Menu.Item key="search" className="menu-item-search">
          <Search
            className={styles.search}
            placeholder="Search Movie"
            onSearch={onSearch}
          />
        </Menu.Item>

        <Menu.SubMenu
          title="Favorite Movies"
          icon={<StarFilled />}
          key="subMenu"
        >
          <Menu.ItemGroup
            title={"My favorite (" + fovoriteMovies?.length + ") movie"}
          >
            {fovoriteMovies?.map((x, index) => (
              <FavoriteMovies key={index} movies={movies} x={x} />
            ))}
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}

export default MovieHeader;
