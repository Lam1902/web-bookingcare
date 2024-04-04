import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../store/actions";



class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
     listUser: []
    };
  }

  async componentDidMount () {
    this.props.getUserRedux()
  }

  componentDidUpdate(prevProps, prevState, snapshot)  {
    if(prevProps.users !== this.props.users) {
        this.setState({
            listUser: this.props.users
        })
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id)
  }

  handleEditUser = (userInfo) => {
    this.props.handleEditUserParent(userInfo)
  }

  render() {
    let arrUsers = this.state.listUser;
    return (
      <div className="users-container">
        <div className="title text-center"><FormattedMessage id="manage-user.title-2"/></div>
        <div className="container-lg">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>User Details</h2>
                  </div>
                  <div className="col-sm-6">
                    <div className="search-box">
                      <div className="input-group">
                        <input
                          type="text"
                          id="search"
                          className="form-control"
                          placeholder="Search by Name"
                        />
                        <span className="input-group-addon">
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ color: "#080808" }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ width: "22%" }}>Email</th>
                    <th style={{ width: "22%" }}><FormattedMessage id="manage-user.firstName"/></th>
                    <th><FormattedMessage id="manage-user.lastName"/></th>
                    <th><FormattedMessage id="manage-user.address"/></th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {arrUsers &&
                    arrUsers.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.fistName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.address}</td>
                          <td>
                            <button className="edit">
                              <FontAwesomeIcon icon={faPenToSquare} 
                              onClick={()=> {this.handleEditUser(item)}}/>
                            </button>

                            <button className="delete">
                              <FontAwesomeIcon icon={faTrash} 
                              onClick={ () => {this.handleDeleteUser(item) }} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserRedux: () => dispatch(actions.getUserStart()),
    deleteUserRedux: (userId) => dispatch(actions.deleteUserRedux(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
