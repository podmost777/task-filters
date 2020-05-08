import React from "react";
import CallApi from "../../api/api";

export default (Component) =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: [],
      };
    }

    getMovies = (filters, page) => {
      const { onChangeTotalPage, genres } = this.props;
      const { sort_by, release_year } = filters;
      const year =
        release_year === "Выберите год"
          ? new Date().getFullYear()
          : release_year;

      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: year,
      };

      if (genres.length > 0) {
        queryStringParams.with_genres = genres.join(",");
      }

      CallApi.get("/discover/movie", {
        params: queryStringParams,
      }).then((data) => {
        this.setState({
          movies: data.results,
        });
        onChangeTotalPage(data);
      });
    };

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page);
    }

    componentDidUpdate(prevProps) {
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
      }
    }

    render() {
      const { movies } = this.state;
      return (
        <Component
          movies={movies}
          session_id={this.props.session_id}
          toggleModal={this.props.toggleModal}
        />
      );
    }
  };
