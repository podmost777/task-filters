import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from './MoviesHOC';
import PropTypes from 'prop-types'

const MoviesList = (props) => (
  <div className="row">
    {props.movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem item={movie} session_id={props.session_id} toggleModal={props.toggleModal}/>
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: []
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
}

export default MoviesHOC(MoviesList);