import React, { Component } from "react";
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";


class MoviePage extends Component {
  state = {
    movie: {},
  };

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU",
      },
    }).then((movie) => {
      movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      this.setState({
        movie,
      });
    });
  }

  render() {
    const { movie } = this.state;
    return (
      <section className="movie-overview">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4">
              <img src={movie.poster_path} alt="Title" width="100%" />
            </div>
            <div className="col-6">
              <h1>{movie.title}</h1>
              <div className="movie-overwiew__mark">
                <span
                  className="material-icons"
                  id="favorite"
                  onClick={this.onClickHandler}
                >
                  {this.props.session_id
                    ? this.state.favorite
                      ? "star"
                      : "star_border"
                    : "star_border"}
                </span>
                <span
                  className="material-icons"
                  id="watchlist"
                  onClick={this.onClickHandler}
                >
                  {this.props.session_id
                    ? this.state.watchlist
                      ? "bookmark"
                      : "bookmark_border"
                    : "bookmark_border"}
                </span>
              </div>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AppContextHOC(MoviePage);