import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import Mdeditor from"react-markdown-editor-lite"



class ManageDoctor extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
