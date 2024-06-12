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
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctorService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInfoDoctorService(id);
      // console.log('check res 13: ', res);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let language = this.props;
    let { detailDoctor } = this.state;
    let nameEn = "",
      nameVi = "";
    // console.log("check 10: ", detailDoctor);
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.fistName} `;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.fistName} ${detailDoctor.lastName} `;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail container">
          <div className="intro-doctor">
            <div className="intro-doctor-left">
              <div
                className="doctor-image"
                style={{
                  backgroundImage: `url(${
                    detailDoctor.image || "default-image.jpg"
                  })`,
                }}
              >
                {" "}
              </div>
            </div>
            <div className="intro-doctor-right">
              <div className="up">
                <h2>
                  {" "}
                  {this.props.language === LANGUAGES.VI ? nameVi : nameEn}
                </h2>
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="schedule-doctor-left">
              < DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="schedule-doctor-right">
              < DoctorExtraInfo
                doctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="cmt-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
