import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { LANGUAGES, CRUD_ACTIONS ,CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImg: "",

      id:"",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      // gender: "",
      // position: "",
      // role: "",
      avatar: "",

      action: CRUD_ACTIONS.CREATE
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderRedux = this.props.genderRedux;
      this.setState({
        genderArr: genderRedux,
        gender: genderRedux && genderRedux.length > 0 ? genderRedux[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let positionRedux = this.props.positionRedux;
      this.setState({
        positionArr: positionRedux,
        position: positionRedux && positionRedux.length > 0 ? positionRedux[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let roleRedux = this.props.roleRedux;
      this.setState({
        roleArr: roleRedux,
        role: roleRedux && roleRedux.length > 0 ? roleRedux[0].keyMap : "",
      });
    }

    if(prevProps.listUserRedux !== this.props.listUserRedux) {
      this.setState({
        
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      // gender: "",
      // position: "",
      // role: "",
      avatar: "",
      previewImg: "",
      })
    }
  }

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    if(this.state.action === CRUD_ACTIONS.CREATE) {
      let data = {
        email: this.state.email,
        password: this.state.password, 
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      }
      console.log("check data save", data)
    this.props.createNewUserRedux(data);
  }
  if(this.state.action === CRUD_ACTIONS.EDIT) {
    alert('xử lí cập nhật')
    let data = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
      avatar: this.state.avatar
    }
    this.props.updateUserRedux(data)
    this.setState({
      action: CRUD_ACTIONS.CREATE
    })
  }
  };

  checkValidateInput = () => {
    let isValid = true;
    const requiredFields = [
      "email",
      "password",
      "lastName",
      "firstName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!this.state[field]) {
        isValid = false;
        alert(`Please enter your ${field}.`);
        break;
      }
    }
    return isValid;
  };

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file)
      console.log("base64: ", base64)
      this.setState({
        previewImg: objUrl,
        avatar: base64,
      });
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserParent = (userInfo) => {
    console.log('dữ liệu từ form gửi lên để cập nhật: ', userInfo)  
    let imageBase64 = ''
    if(userInfo.image) {
      imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary')
    }
    this.setState({
        id: userInfo.id,
        email: userInfo.email,
        password: "hashpassword",
        firstName: userInfo.fistName,
        lastName: userInfo.lastName,
        address: userInfo.address,
        phoneNumber: userInfo.phonenumber,
        gender: userInfo.gender,
        position: userInfo.positionId,
        role: userInfo.roleId,
        avatar: userInfo.avatar,
        action: CRUD_ACTIONS.EDIT,
        previewImg: imageBase64
    })
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title"><FormattedMessage id="manage-user.title-1" /></div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row ">
              <div className="row mb-3 mt-3">
                <div className="col-md-12">
                  <FormattedMessage id="manage-user.add-user" />
                </div>
              </div>
              <form className="form-background">
                <div className="row mb-3">
                  <div className="form-group col-md-3">
                    <label for="inputEmail4">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => this.onChangeInput(event, "email")}
                      disabled = {this.state.action === CRUD_ACTIONS.EDIT}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label for="inputPassword4">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      value={password}
                      onChange={(event) =>
                        this.onChangeInput(event, "password")
                      }
                      disabled = {this.state.action === CRUD_ACTIONS.EDIT}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label for="inputEmail4">
                      <FormattedMessage id="manage-user.firstName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(event) =>
                        this.onChangeInput(event, "firstName")
                      }
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label for="inputEmail4">
                      <FormattedMessage id="manage-user.lastName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="LN"
                      value={lastName}
                      onChange={(event) =>
                        this.onChangeInput(event, "lastName")
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="form-group col-md-3">
                    <label for="inputAddress">
                      <FormattedMessage id="manage-user.phone" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(event) =>
                        this.onChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="form-group col-md-5">
                    <label for="inputAddress">
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      value={address}
                      onChange={(event) => this.onChangeInput(event, "address")}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="form-group col-md-2">
                    <label for="inputCity">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      id="inputState"
                      className="form-control"
                      onChange={(event) => this.onChangeInput(event, "gender")}
                      value={gender}
                    >
                      {genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label for="inputState">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      id="inputState"
                      className="form-control"
                      onChange={(event) =>
                        this.onChangeInput(event, "position")
                      }
                      value={position}
                    >
                      {positions.length > 0 &&
                        positions.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap} >
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label for="inputZip">
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      id="inputState"
                      className="form-control"
                      onChange={(event) => this.onChangeInput(event, "role")}
                      value={role}
                    >
                      {roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label for="inputZip">
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <div className="preview-img-container">
                      <input
                        type="file"
                        className="form-control"
                        id="previewImg"
                        hidden
                        onChange={(event) => this.handleOnChangeImg(event)}
                      />
                      <label className="lable-upImg" htmlFor="previewImg">
                        Tải ảnh
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="icon-upImg"
                        />
                      </label>
                      <div
                        className="preview-image "
                        style={{
                          backgroundImage: `url(${this.state.previewImg})`,
                          backgroundPosition: "center", 
                        }}
                      >
                        {/* Nội dung của bạn ở đây */}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" :"btn btn-primary" }
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleSaveUser();
                  }}
                > 
                 <FormattedMessage id= {this.state.action === CRUD_ACTIONS.EDIT ? "manage-user.edit" : "manage-user.save"}/>
                </button>
              </form>
            </div>
          </div>
        </div>

        <TableManageUser
          handleEditUserParent =  {this.handleEditUserParent}
          actionParent = {this.state.action}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
    genderRedux: state.admin.gender,
    positionRedux: state.admin.positions12,
    roleRedux: state.admin.roles,
    listUserRedux: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.getAllCodeStart()),
    getPositionStart: () => dispatch(actions.getPositionStart()),
    getRoleStart: () => dispatch(actions.getRoleStart()),
    createNewUserRedux: (data) => dispatch(actions.createNewUserRedux(data)),
    updateUserRedux: (data) => dispatch(actions.updateUserRedux(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
