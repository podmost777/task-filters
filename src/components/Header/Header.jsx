import React from "react";
import Login from "./Login/Login";
import User from "./User";
import AppContextHOC from '../HOC/AppContextHOC';
import { Link } from "react-router-dom";


class Header extends React.Component {
  render() {
    const { user, toggleModal, showModal } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          {user ? (
            <User />
          ) : (
            <Login toggleModal={toggleModal} showModal={showModal}/>
          )}
        </div>
      </nav>
    );
  }
}

export default AppContextHOC(Header);
