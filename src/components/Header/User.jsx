import React from "react";

export default class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          className="rounded-circle"
          width={"40px"}
          src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
          alt="Avatar"
        />
      </div>
    );
  }
}
