import React from "react";
import genresList from "./genres";
import PropTypes from "prop-types";

const Genre = ({ onChangeGenres, genres }) => (
  <div className="form-check mb-2">
    {genresList.genres.map(genre => (
      <div key={genre.id}>
        <input
          className="form-check-input"
          type="checkbox"
          id={genre.id}
          name={genre.name}
          onChange={onChangeGenres}
          checked={genres.includes(genre.id)}
        />
        <label className="form-check-label" htmlFor={genre.id}>
          {genre.name}
        </label>
      </div>
    ))}
  </div>
);

Genre.defaultProps = {
  genres: []
};

Genre.propTypes = {
  genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func.isRequired
};

export default Genre;
