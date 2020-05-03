import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import UserMenu from "./UserMenu";



class User extends React.Component {
  render() {
    const { user, onLogOut, session_id } = this.props;
    return (
      <UserMenu user={user} onLogOut={onLogOut} session_id={session_id}/>
    );
  }
}

export default AppContextHOC(User);
