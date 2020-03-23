import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { fetchApi, API_URL, API_KEY_3 } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
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

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

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
    });
    console.log(this.state.genres);
  };

  onChangeGenres = event => {
    const name = +event.target.name;

    const genres = [...this.state.genres];

    for (let genre in genres) {
      if (genres[genre].id === name) {
        genres[genre].checked = !genres[genre].checked;
      }
    }

    this.setState({
      genres
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        this.updateUser(user);
      });
    }
  }

  render() {
    const { filters, page, total_pages, genres, user } = this.state;

    return (
      <div>
        <Header
          user={user}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
        />
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
      </div>
    );
  }
}
