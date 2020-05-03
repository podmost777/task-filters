import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
      showModal: false,
      filters: {
        sort_by: "popularity.desc",
        release_year: "Выберите год",
      },
      page: 1,
      total_pages: "",
      genres: [],
    };
  }

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");

    this.setState({
      session_id: null,
      user: null,
      showModal: false
    });
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
    });

    this.setState({
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

  toggleModal = () => {
    this.setState(prev => ({
      showModal: !prev.showModal
    }));
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id,
        },
      }).then((user) => {
        this.updateUser(user);
        this.updateSessionId(session_id);
      });
    }
  }

  render() {
    const { filters, page, total_pages, genres, user, session_id, showModal } = this.state;

    return (
      <AppContext.Provider
        value={{
          user: user,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          session_id: session_id,
          onLogOut: this.onLogOut,
        }}
      >
        <div>
          <Header user={user} toggleModal={this.toggleModal} showModal={showModal}/>
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
                  toggleModal={this.toggleModal}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
