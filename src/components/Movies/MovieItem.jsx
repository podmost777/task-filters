import React from "react";
import CallApi from "../../api/api";
import { Link } from "react-router-dom";

export default class MovieItem extends React.Component {
  state = {
    favorite: false,
    watchlist: false,
  };

  onClickHandler = (e) => {
    const name = e.target.id;
    const { session_id, toggleModal } = this.props;
    if (session_id) {
      this.setState(
        (state) => ({
          [name]: !state[name],
        }),
        () => {
          CallApi.get("/account", {
            params: {
              session_id,
            },
          }).then((data) => {
            CallApi.post(`/account/${data.id}/${name}`, {
              params: {
                session_id,
              },
              body: {
                media_type: "movie",
                media_id: 550,
                [name]: this.state[name],
              },
            });
          });
        }
      );
    } else {
      toggleModal();
    }
  };

  render() {
    const { item } = this.props;
    const imgSrc = `https://image.tmdb.org/t/p/w500${
      item.backdrop_path || item.poster_path
    }`;

    const defaultImg =
      "https://x.kinja-static.com/assets/images/logos/placeholders/default.png";

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={
            imgSrc === "https://image.tmdb.org/t/p/w500null"
              ? defaultImg
              : imgSrc
          }
          width="288"
          alt="Img"
        />
        <div className="card-body">
          <div className="card-preview">
            <Link className="card-title" to={`/movie/${item.id}`}>{item.title}</Link>
            <div className="icons-wrapper">
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
          </div>

          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}
