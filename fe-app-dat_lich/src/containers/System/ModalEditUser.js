import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "react-bootstrap"; // Assuming you're using React Bootstrap
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.fistName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleChangeInput = (event, id) => {
    // tạo ra 1 bản sao của this.state và sẽ thao tác trên dữ liệu này
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

    //check thong tin gui len
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "email", "password", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValideInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  handleSaveUser = () => {
    let isValid = this.checkValideInput();
    if (isValid) {
      this.props.updateUser(this.state);
    }
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.isOpen}
          onHide={this.toggle}
          className="modal-create-user-container"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Edit a user
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-12 form-group">
                  <form>
                    <div className="row row-form-create-user ">
                      <div className="col-6 form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="Enter first name"
                          onChange={(event) => {
                            this.handleChangeInput(event, "firstName");
                          }}
                          value={this.state.firstName}
                        />
                      </div>
                      <div className="col-6  form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter last name"
                          value={this.state.lastName}
                          onChange={(event) => {
                            this.handleChangeInput(event, "lastName");
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group row-form-create-user">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={this.state.email}
                        disabled
                        onChange={(event) => {
                          this.handleChangeInput(event, "email");
                        }}
                      />
                    </div>
                    <div className="form-group row-form-create-user">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={this.state.password}
                        disabled
                        onChange={(event) => {
                          this.handleChangeInput(event, "password");
                        }}
                      />
                    </div>
                    <div className="row row-form-create-user">
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Address"
                          value={this.state.address}
                          onChange={(event) => {
                            this.handleChangeInput(event, "address");
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                this.handleSaveUser();
              }}
            >
              Update
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
              style={{ backgroundColor: "red" }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
