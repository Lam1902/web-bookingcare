import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils/constant";
import { getScheduleDoctorByDate } from "../../../services/userService";
import moment from 'moment';
import 'moment/locale/vi';
import BookingModal from "./Modal/BookingModal.js";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModel: {}
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.setArrDays(language);
    this.setState({
      allDays: allDays
    });
    // Fetch initial schedule
    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvailableTime: res.data ? res.data : []
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.setArrDays(this.props.language);
      this.setState({
        allDays: allDays
      });
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      this.fetchSchedule(this.props.doctorIdFromParent, this.state.allDays[0].value);
    }
  }

  fetchSchedule = async (doctorId, date) => {
    let res = await getScheduleDoctorByDate(doctorId, date);
    if (res && res.errCode === 0) {
      this.setState({
        allAvailableTime: res.data ? res.data : []
      });
    }
  };

  handleOnchange = (event) => {
    let date = event.target.value;
    this.fetchSchedule(this.props.doctorIdFromParent, date);
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModel: time,
    });
  }

  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false
    });
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  render() {
    let listDays = this.state.allDays;
    let listAvalibleTime = this.state.allAvailableTime;
    let { language } = this.props;
    let { isOpenModalBooking, dataScheduleTimeModel } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnchange(event)}>
              {listDays && listDays.length > 0 &&
                listDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <i>
              <span className="title-calendar">
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </i>
          </div>
          <div className="time-content">
            {listAvalibleTime && listAvalibleTime.length > 0 ?
              <>
                <div>
                  {listAvalibleTime.map((item, index) => {
                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                    return (
                      <button key={index} className="time-btn" onClick={() => this.handleClickScheduleTime(item)}>{timeDisplay}</button>
                    );
                  })}
                </div>
                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <i></i>
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
              :
              <div className="none-schedule">
                <FormattedMessage id="patient.detail-doctor.none-schedule" />
              </div>
            }
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModel}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
