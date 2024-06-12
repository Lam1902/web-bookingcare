import React, { Component  }  from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "react-flatpickr";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import Select from "react-select";
import {
  postPatientAppointment,
  getExtraInforDoctorById,
  getDetailInfoDoctorService,
} from "../../../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",

      doctorName: "",
      loading: false,
    };
  }

  async componentDidMount() {
    this.props.getGender();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      [id]: valueInput,
    }));
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  handleConfirmBooking = async () => {
    this.setState({ loading: true });
    let date = new Date(this.state.birthday).getTime();
    let doctorInfor = await getExtraInforDoctorById(this.state.doctorId);
    let doctorInforExtra = await getDetailInfoDoctorService(this.state.doctorId);
    let doctorName =
      doctorInforExtra.data.data.lastName + doctorInforExtra.data.data.fistName;
    // console.log('check data lấy mới: ',doctorInforExtra)
    let data = {
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      birthday: date,
      nameClinic: doctorInfor.data.nameClinic,
      doctorName: doctorName,
      date: this.props.dataTime.date
      
    };
    console.log("check data gửi lên: ", data);

    let res = await postPatientAppointment(data);

    if (res.errCode === 0) {
      toast.success("Đặt lịch khám thành công");
      this.props.closeBookingClose();
      this.setState({ loading: false });
    } else {
      toast.error("Đặt lịch khám thất bại");
      this.setState({ loading: false });
    }
  };

  render() {
    let { isOpenModal, closeBookingClose, dataTime } = this.props;
    let doctorId;
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    // console.log('check state: ', this.state)
    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span className="right" onClick={closeBookingClose}>
              <i className="fas fa-times" />
            </span>
          </div>
          <div>
            {this.state.loading && <Loading />}
            </div>
          <div className="booking-modal-body">
            <div className="doctor-info">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice = {true}
              />
            </div>
            <div className="doctor-infor">
            </div>
            <div className="price">
              <div className="row">
                <div className="col-6 form-group">
                  <label>Họ tên</label>
                  <input
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "fullName")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Giới tính</label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Ngay sinh</label>
                  <DatePicker
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control"
                    value={this.state.birthday}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Số điện thoại</label>
                  <input
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ</label>
                  <input
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "address")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "email")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Lý do khám</label>
                  <input
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnchangeInput(event, "reason")
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              Xác nhận
            </button>
            <button className="btn-cancel" onClick={closeBookingClose}>
              Trở lại
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.getAllCodeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
