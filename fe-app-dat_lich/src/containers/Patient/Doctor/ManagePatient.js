import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ManagePatient.scss";
import { getListPatientForDoctor, successBooking } from "../../../services/userService";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentDate: new Date(),
      patientList: [],
      showModal: false,
      selectedBookId: null,
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    if (user && user.userData && user.userData.id) {
      const doctorId = user.userData.id;
      this.getDataPatient(doctorId);
    }
  }

  getDataPatient = async (doctorId) => {
    const { currentDate } = this.state;
    const formatDate = moment(currentDate).startOf('day').valueOf();
    const res = await getListPatientForDoctor(doctorId, formatDate);
    if (res && res.errCode === 0) {
      this.setState({
        patientList: res.data,
      });
    } else {
      console.error('Error fetching patient list: ', res);
    }
  }

  handleOnchangeDatePicker = (date) => {
    const selectedDate = moment(date[0]).startOf('day').valueOf();
    this.setState(
      {
        currentDate: selectedDate // assuming date is an array with the selected date
      } 
    );
    console.log('date select: ', this.state.currentDate);
  }

  formatDate = (date) => {
    let timestamp = Number(date);
    let formattedDate = moment(timestamp).format('DD/MM/YYYY');
    return formattedDate;
  }

  handleConfirm = async () => {
    let res = await successBooking(this.state.selectedBookId);
    if (res && res.errCode === 0) {
      this.getDataPatient(this.props.user.userData.id);
    }
    this.setState({ showModal: false, selectedBookId: null });
  }

  handleShowModal = (bookId) => {
    this.setState({ showModal: true, selectedBookId: bookId });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedBookId: null });
  }

  render() {
    const { patientList, currentDate, showModal } = this.state;
    const filteredPatientList = patientList.filter(item => Number(item.date) === currentDate);
    console.log('fil:', patientList);
    return (
      <>
        <div className="manage-patient-container">
          <div className="title">
            <FormattedMessage id="manage-patient.title" defaultMessage="Quản lý lịch khám" />
          </div>
          <div className="row manage-patient-table">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-patient.select-date" defaultMessage="Chọn ngày" />
              </label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                value={this.state.currentDate}
                className="form-control"
              />
            </div>
            <div style={{color:"white"}}>Tổng số lịch hẹn ngày {moment(currentDate).format('DD/MM/YYYY')}: {filteredPatientList.length} </div>
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ width: 150 }}>
                        <FormattedMessage id="manage-patient.name" defaultMessage="Họ tên" />
                      </th>
                      <th style={{ width: 50 }}>
                        <FormattedMessage id="manage-patient.gender" defaultMessage="Giới tính" />
                      </th>
                      <th style={{ width: 100 }}>
                        <FormattedMessage id="manage-patient.phone-number" defaultMessage="Ngày sinh" />
                      </th>
                      <th style={{ width: 100 }}>
                        <FormattedMessage id="manage-patient.birthday" defaultMessage="Số điện thoại" />
                      </th>
                      <th style={{ width: 100 }}>
                        <FormattedMessage id="manage-patient.appointment-date" defaultMessage="Ngày khám" />
                      </th>
                      <th style={{ width: 100 }}>
                        <FormattedMessage id="manage-patient.appointment-time" defaultMessage="Giờ khám" />
                      </th>
                      <th style={{ width: 100 }}>
                        <FormattedMessage id="manage-patient.actions" defaultMessage="Chức năng" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientList && patientList.length > 0 ? (
                      patientList
                        .filter(item => Number(item.date) === currentDate)
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{item.patientData?.fistName || 'N/A'}</td>
                            <td>{item.patientData?.genderData?.valueVi || 'N/A'}</td>
                            <td>{this.formatDate(item.birthday)}</td>
                            <td>{item.phoneNumber || 'N/A'}</td>
                            <td>{this.formatDate(item.date)}</td>
                            <td>{item.timeTypeDataPatient?.valueVi || 'N/A'}</td>
                            <td className="btn-action">
                              {['S3'].includes(item.statusId) ? (
                                <div><FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />  Hoàn thành</div>
                              ) : (
                                <button className="confirm" onClick={() => this.handleShowModal(item.id)}>Đã khám</button>
                              )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          <FormattedMessage id="manage-patient.no-data" defaultMessage="Không có dữ liệu" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận hoàn thành</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xác nhận hoàn thành lịch hẹn này?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Hủy
            </Button>
            <Button variant="primary" onClick={this.handleConfirm}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
