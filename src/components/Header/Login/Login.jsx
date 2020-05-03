import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  state = {
    canClose: true,
  };

  toggleClose = () => {
    if (this.state.canClose) {
      this.props.toggleModal();
    }
  };

  changeClose = () => {
    this.setState((state) => ({
      canClose: !state.canClose,
    }));
  };

  render() {
    const { showModal, toggleModal } = this.props;
    return (
      <div>
        <button className="btn btn-success" type="button" onClick={toggleModal}>
          Login
        </button>
        <Modal isOpen={showModal} toggle={this.toggleClose}>
          <ModalBody>
            <LoginForm changeClose={this.changeClose} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
