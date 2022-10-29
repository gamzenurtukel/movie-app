import React from "react";
import { Menu, Image } from "antd";
import { Input } from "antd";
import { Link } from "react-router-dom";
import styles from "./MovieHeader.module.css";
import { StarFilled } from "@ant-design/icons";
import { favoriteList, allMovies } from "../../Redux/slices/moviesSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MovieHeader({ setText }) {
  const { Search } = Input;
  const fovoriteMovies = useSelector(favoriteList);
  const movies = useSelector(allMovies);
  const navigate = useNavigate();

  const onSearch = (value) => {
    setText(value);
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
              <Menu.Item key={index}>
                <p>
                  {
                    movies.Search?.find((movie) => movie.imdbID === x.imdbID)
                      ?.Title
                  }
                </p>
                <Image
                  width={20}
                  height={20}
                  src={
                    movies.Search?.find((movie) => movie.imdbID === x.imdbID)
                      ?.Poster
                  }
                />
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}

export default MovieHeader;
