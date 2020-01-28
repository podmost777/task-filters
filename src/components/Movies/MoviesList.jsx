import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const { onChangeTotalPage, genres } = this.props;
    const { sort_by, release_year } = filters;
    const year =
      release_year === "Выберите год" ? new Date().getFullYear() : release_year;
    const genresList = [];


    for (let genre in genres) {
      if (genres[genre].checked) {
        genresList.push(genres[genre].id);
      }
    }

    const filterGenres = genresList.join(",");

    const link = genresList
      ? `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}
    &primary_release_year=${year}&with_genres=${filterGenres}`
      : `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}
    &primary_release_year=${year}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        onChangeTotalPage(data);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("props", this.props.genres, "nextProps", nextProps.genres);
  //   if (nextProps.genres !== this.props.genres) {
  //         this.getMovies(nextProps.filters, 1);
  //   }
  // }

  componentDidUpdate(prevProps) {
    //console.log("componentDidUpdate", "prevProps", prevProps);

    // console.log("prevProps", prevProps );
    // console.log('this.props.genres: ', this.props.genres);

    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }

    if (this.props.filters.release_year !== prevProps.filters.release_year) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.genres !== prevProps.genres) {
      this.getMovies(this.props.filters, 1);
      //this.getMovies(this.props.filters, 1);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
