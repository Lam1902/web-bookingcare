import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import './VerifyEmail.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });

      if (res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    console.log("check state: ", this.state);
    return (
      <>
      <div className="page">
        <div>
        <HomeHeader />
        </div>
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data .........</div>
          ) : (
            <div>
              { errCode === 0 ? 
              
               <div className="info-booking success" style={{color: "green"}}>
                  <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                  Xác nhận lịch hẹn thành công
                </div>
               : 
                <div className="info-booking error">
                  <FontAwesomeIcon icon={faExclamationCircle} className="icon" />
                  Lịch hẹn không tồn tại hoặc đã được xác nhận
                </div>
              }
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
