import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { fetchApi, API_URL, API_KEY_3 } from "../../api/api";

class UserMenu extends React.Component {
  state = {
    dropdownOpen: false,
  };

  toggleDropDown = () => {
    this.setState((state) => ({
      dropdownOpen: !state.dropdownOpen,
    }));
  };

  handleLogOut = () => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        session_id: this.props.session_id,
      }),
    }).then(() => this.props.onLogOut());
  };

  render() {
    const { user } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropDown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            className="rounded-circle"
            width={"40px"}
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
            alt="Avatar"
            onClick={this.toggleDropDown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogOut}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default UserMenu;
