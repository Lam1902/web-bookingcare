import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getAllUsers ,createNewUser , deleteUser, updateUser} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import {emitter} from "../../utils/emitter"

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
    };
  }
  state = {};

  async componentDidMount() {
    let res = await getAllUsers("All");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers('All')
    if(response && response.errCode ===0 ){
      this.setState({
        arrUsers: response.users
      })
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleModalUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleModalEditUser = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  }

  createNewUser = async (data) => {
    try {
     let response = await createNewUser(data)
     if (response && response.errCode !== 0 ) {
        alert(response.message)
     }else {
      await this.getAllUsersFromReact()
      this.setState({
        isOpenModalUser: false
      })
      emitter.emit('EVENT_CLEAR_MODAL_DATA')
     }

    }catch(e) {
      console.log(e)
    }

  }

  handleDeleteUser = async (item) => {
    try {
      let userId = item.id
      let res = await deleteUser(userId)
      if(res && res.errCode === 0 ) {
          await this.getAllUsersFromReact()
          this.setState({
            isOpenModalEditUser: false
          })
      }else {
        alert(res.message)
      }
    }catch (e) {
      console.log(e)
    }
  }

  handleEditUser = async (item) => {
   
    this.setState({
      isOpenModalEditUser: true,
      userEdit : item
    })    
  }

  handleUpdateUser = async (user) => {
    try{
      let res = await updateUser(user)
      if(res && res.errCode === 0 ) {
        this.setState({
          isOpenModalEditUser: false
        })
        await this.getAllUsersFromReact()
    }else {
      alert(res.message)
    }
    }catch (e) {
      console.log(e)
    }
  }


  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleModalUser}
          createNewUser = {this.createNewUser}
        />

      {
        this.state.isOpenModalEditUser &&
        <ModalEditUser 
        isOpen = {this.state.isOpenModalEditUser}
          toggleFromParent={this.toggleModalEditUser}
          currentUser = {this.state.userEdit}
          updateUser = {this.handleUpdateUser}
          
        />
      }
       

        <div className="title text-center"><FormattedMessage id="menu.admin.manage-account"/></div>
        <div className="container-lg">
          <div className="mx-1">
            <button
              className="btn btn-primary"
              onClick={() => this.handleAddNewUser()}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
              Add new user
            </button>
          </div>
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
                    <th style={{ width: "22%" }}>FirsName</th>
                    <th>LastName</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {arrUsers &&
                    arrUsers.map((item, index) => {
                      return (
                        <tr>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
