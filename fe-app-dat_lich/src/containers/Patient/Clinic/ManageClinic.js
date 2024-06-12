import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createNewClinic, getAllClinic, deleteClinic, updateClinic } from "../../../services/userService";
import CommonUtils from "../../../utils/CommonUtils";
import './ManageClinic.scss';
import {
  faTrash,
  faPenToSquare,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      imageBase64: '',
      address: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      listClinic: [],
      isEdit: false,
    };
  }

  async componentDidMount() {
    this.fetchAllClinics();
  }

  fetchAllClinics = async () => {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        listClinic: res.data
      });
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  }

  handleSaveClinic = async () => {
    const { isEdit, id, name, imageBase64, address, descriptionHTML, descriptionMarkdown } = this.state;
    let data = { id, name, imageBase64, address, descriptionHTML, descriptionMarkdown };
    let res;

    if (isEdit) {
      res = await updateClinic(data);
      if (res && res.errCode === 0) {
        toast.success('Cập nhật phòng khám thành công');
      } else {
        toast.error('Lỗi cập nhật phòng khám');
      }
    } else {
      res = await createNewClinic(data);
      if (res && res.errCode === 0) {
        toast.success('Thêm phòng khám mới thành công');
      } else {
        toast.error('Lỗi thêm phòng khám mới');
      }
    }

    if (res && res.errCode === 0) {
      this.setState({
        id: '',
        name: '',
        imageBase64: '',
        address: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        isEdit: false,
      });
      this.fetchAllClinics();
    }
  }

  handleEditClinic = (clinic) => {
    this.setState({
      id: clinic.id,
      name: clinic.name,
      imageBase64: `data:image/png;base64,`+clinic.image,
      address: clinic.address,
      descriptionHTML: clinic.descriptionHTML,
      descriptionMarkdown: clinic.descriptionMarkdown,
      isEdit: true,
    });
  }

  handleDeleteClinic = async (id) => {
    let res = await deleteClinic(id);
    if (res && res.errCode === 0) {
      toast.success('Xóa phòng khám thành công');
      this.fetchAllClinics();
    } else {
      toast.error('Lỗi xóa phòng khám');
    }
  }

  render() {
    let { listClinic } = this.state;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="title">Quản lý phòng khám</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>Tên phòng khám</label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, 'name')}
              />
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ phòng khám</label>
              <input
                className="form-control"
                type="text"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, 'address')}
              />
            </div>
            <div className="col-6 form-group">
              <label>Ảnh phòng khám</label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              />
              {this.state.imageBase64 && (
                <img
                  src={this.state.imageBase64}
                  alt="Specialty"
                  className="img-preview mt-2"
                />
              )}
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: '300px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary mt-3"
                onClick={() => this.handleSaveClinic()}
              >
                {this.state.isEdit ? 'Cập nhật' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>

        <div className="users-container">
          <div className="title text-center">Danh sách phòng khám</div>
          <div className="container-lg">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2>Phòng khám</h2>
                    </div>
                    <div className="col-sm-6">
                      <div className="search-box">
                        <div className="input-group">
                          <input
                            type="text"
                            id="search"
                            className="form-control"
                            placeholder="Tìm kiếm theo tên"
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
                      <th style={{ width: "12%" }}>Mã phòng khám</th>
                      <th style={{ width: "22%" }}>Tên phòng khám</th>
                      <th style={{ width: "22%" }}>Địa chỉ</th>
                      <th style={{ width: "22%" }}>Hình ảnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listClinic &&
                      listClinic.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>
                              <div>
                                <img className="img-preview-2" src={`data:image/png;base64,` + item.image} alt="Ảnh" />
                              </div>
                            </td>
                            <td>
                              <button className="edit">
                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => { this.handleEditClinic(item) }} />
                              </button>

                              <button className="delete">
                                <FontAwesomeIcon icon={faTrash} onClick={() => { this.handleDeleteClinic(item.id) }} />
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
