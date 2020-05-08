import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";

class MoviesPage extends React.Component {
  state = {
    filters: {
      sort_by: "popularity.desc",
      release_year: "Выберите год",
    },
    page: 1,
    total_pages: "",
    genres: [],
  };

  onChangeFilters = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  onChangePage = (page) => {
    this.setState({
      page,
    });
  };

  onChangeTotalPage = (data) => {
    this.setState({
      total_pages: data.total_pages,
    });
  };

  resetFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        release_year: "Выберите год",
      },
      page: 1,
      total_pages: "",
      genres: [],
    });
  };

  onChangeGenres = (event) => {
    const genreId = +event.target.id;

    const genres = [...this.state.genres];

    if (genres.includes(genreId)) {
      genres.splice(genres.indexOf(genreId), 1);
    } else {
      genres.push(genreId);
    }

    this.setState({
      genres,
    });
    return genres;
  };

  render() {
    const { page, filters, total_pages, genres } = this.state;
    const { session_id, toggleModal } = this.props;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  total_pages={total_pages}
                  resetFilters={this.resetFilters}
                  onChangeGenres={this.onChangeGenres}
                  genres={genres}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              onChangeTotalPage={this.onChangeTotalPage}
              resetFilters={this.resetFilters}
              genres={genres}
              onChangeGenres={this.onChangeGenres}
              session_id={session_id}
              toggleModal={toggleModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviesPage);
