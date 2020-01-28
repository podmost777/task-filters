import React from "react";
import genresItems from "./genres";

export default class Genre extends React.Component {
  render() {
    const { onChangeGenres, genres } = this.props;
    const genresList = genresItems.genres.map((genre, i) => (
      <div key={genre.id}>
        <input
          className="form-check-input"
          type="checkbox"
          id={i}
          name={genre.id}
          value={genres[i].checked}
          onChange={onChangeGenres}
          checked={genres[i].checked}
        />
        <label className="form-check-label" htmlFor={i}>
          {genre.name}
        </label>
      </div>
    ));
    return <div className="form-check mb-2">{genresList}</div>;
  }
}
