import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createNewSpecialty, deleteSpecialty, updateSpecialty, getAllSpecialty } from "../../../services/userService"; // import các hàm cần thiết
import CommonUtils from "../../../utils/CommonUtils";
import './ManageSpecialty.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      listSpecialty: [],
      isEdit: false,
      id: ''
    };
  }

  async componentDidMount() {
    this.fetchAllSpecialties();
  }

  fetchAllSpecialties = async () => {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        listSpecialty: res.data,
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

  handleSaveNewSpecialty = async () => {
    let { isEdit, id, name, imageBase64, descriptionHTML, descriptionMarkdown } = this.state;
    if (!isEdit) {
      let res = await createNewSpecialty({ name, imageBase64, descriptionHTML, descriptionMarkdown });
      if (res && res.errCode === 0) {
        toast.success('Thêm chuyên khoa mới thành công');
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        });
        this.fetchAllSpecialties();
      } else {
        toast.error('Lỗi thêm chuyên khoa mới');
      }
    } else {
      let res = await updateSpecialty({ id, name, imageBase64, descriptionHTML, descriptionMarkdown });
      if (res && res.errCode === 0) {
        toast.success('Cập nhật chuyên khoa thành công');
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
          isEdit: false,
          id: ''
        });
        this.fetchAllSpecialties();
      } else {
        toast.error('Lỗi cập nhật chuyên khoa');
      }
    }
  }

  handleEditSpecialty = (specialty) => {
    this.setState({
      id: specialty.id,
      name: specialty.name,
      imageBase64: `data:image/png;base64,` + specialty.image,
      descriptionHTML: specialty.descriptionHTML,
      descriptionMarkdown: specialty.descriptionMarkdown,
      isEdit: true,
    });
  }

  handleDeleteSpecialty = async (id) => {
    let res = await deleteSpecialty(id);
    if (res && res.errCode === 0) {
      toast.success('Xóa chuyên khoa thành công');
      this.fetchAllSpecialties();
    } else {
      toast.error('Lỗi xóa chuyên khoa');
    }
  }

  render() {
    let { listSpecialty } = this.state;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="title">Quản lý chuyên khoa</div>

          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>Tên chuyên khoa</label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, 'name')}
              />
            </div>
            <div className="col-6 form-group">
              <label>Ảnh chuyên khoa</label>
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
                onClick={() => this.handleSaveNewSpecialty()}
              >
                {this.state.isEdit ? 'Cập nhật' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
        <div className="users-container">
          <div className="title text-center">Danh sách chuyên khoa</div>
          <div className="container-lg">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2>Chuyên khoa</h2>
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
                      <th style={{ width: "12%" }}>Mã chuyên khoa</th>
                      <th style={{ width: "22%" }}>Tên chuyên khoa</th>
                      <th style={{ width: "22%" }}>Hình ảnh</th>
                      <th style={{ width: "22%" }}>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSpecialty && listSpecialty.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <div>
                              <img className="img-preview-2" src={`data:image/png;base64,` + item.image} alt="Ảnh" />
                            </div>
                          </td>
                          <td>
                            <button className="edit" onClick={() => this.handleEditSpecialty(item)}>
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button className="delete" onClick={() => this.handleDeleteSpecialty(item.id)}>
                              <FontAwesomeIcon icon={faTrash} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
