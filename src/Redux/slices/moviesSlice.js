import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../services/movieApi";
import { apiKey } from "../services/movieApiKey";
import { message } from "antd";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async ({ text, page }) => {
    const querys = {
      page: new URLSearchParams(window.location.search).get("page") || 1,
      search:
        new URLSearchParams(window.location.search).get("search") || "harry",
    };

    const response = await movieApi.get(
      `?apikey=${apiKey}&s=${querys.search}&type=movie&page=${querys.page}`
    );
    return response.data;
  }
);

export const fetchAsyncMoviesDetail = createAsyncThunk(
  "movies/fetchAsyncMoviesDetail",
  async (id) => {
    const response = await movieApi.get(`?apikey=${apiKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  movieDetail: {},
  moviesFavoriteList: [],
  pending: true,
  error: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFovoriteMovies: (state, action) => {
      const movie = state.moviesFavoriteList.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      if (movie) {
        movie.amount++;
      } else {
        state.moviesFavoriteList = state.moviesFavoriteList.concat({
          ...action.payload,
          amount: 1,
        });
      }
    },
  },
  extraReducers: {
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      message.error("Movies not loaded");
    },
    [fetchAsyncMoviesDetail.fulfilled]: (state, { payload }) => {
      return { ...state, movieDetail: payload, pending: false, error: false };
    },
    [fetchAsyncMoviesDetail.pending]: (state, { payload }) => {
      return { ...state, pending: true, error: false };
    },
    [fetchAsyncMoviesDetail.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: true };
    },
  },
});
export default moviesSlice.reducer;
export const allMovies = (state) => state.movies.movies;
export const movieDetail = (state) => state.movies.movieDetail;
export const favoriteList = (state) => state.movies.moviesFavoriteList;
export const getPending = (state) => state.movies.pending;
export const getError = (state) => state.movies.error;
export const { addFovoriteMovies } = moviesSlice.actions;
