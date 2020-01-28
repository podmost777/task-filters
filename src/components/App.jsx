import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        release_year: "Выберите год"
      },
      page: 1,
      total_pages: "",
      genres: [
        {
          id: 28,
          checked: false
        },
        {
          id: 12,
          checked: false
        },
        {
          id: 16,
          checked: false
        },
        {
          id: 35,
          checked: false
        },
        {
          id: 80,
          checked: false
        },
        {
          id: 99,
          checked: false
        },
        {
          id: 18,
          checked: false
        },
        {
          id: 10751,
          checked: false
        },
        {
          id: 14,
          checked: false
        },
        {
          id: 36,
          checked: false
        },
        {
          id: 27,
          checked: false
        },
        {
          id: 10402,
          checked: false
        },
        {
          id: 9648,
          checked: false
        },
        {
          id: 10749,
          checked: false
        },
        {
          id: 878,
          checked: false
        },
        {
          id: 10770,
          checked: false
        },
        {
          id: 53,
          checked: false
        },
        {
          id: 10752,
          checked: false
        },
        {
          id: 37,
          checked: false
        }
      ]
    };
  }

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePage = page => {
    this.setState({
      // page: page
      page
    });
  };

  onChangeTotalPage = data => {
    this.setState({
      total_pages: data.total_pages
    });
  };

  resetFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        release_year: "Выберите год"
      },
      page: 1
    });

    const genres = [...this.state.genres];
    for (let genre in genres) {
      genres[genre].checked = false;
    }

    this.setState({
      genres
    })
   console.log(this.state.genres);

  };

  onChangeGenres = event => {
    //console.log(this.state.genres);
    const name = +event.target.name;
    //const value = event.target.value;

    const genres = [...this.state.genres];

    for (let genre in genres) {
      if (genres[genre].id === name) {
        //console.log(genres[genre].checked);
        genres[genre].checked = !genres[genre].checked;
      }
    }

    //console.log(genres);
    this.setState({
      genres
    });

    //console.log(this.state.genres);
  };

  render() {
    const { filters, page, total_pages, genres } = this.state;

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
            />
          </div>
        </div>
      </div>
    );
  }
}
