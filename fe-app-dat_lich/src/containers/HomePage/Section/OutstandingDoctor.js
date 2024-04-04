import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./OutstandingDoctor.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/doctor-img/155650-gs-ha-van-quyet.jpg";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
const { Buffer } = require('buffer');



class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidMount() {
    this.props.getTopDoctorStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }

  render() {
    let arrDoctors = this.state.arrDoctors;
    let {language} = this.props
    // console.log("check arr: ", arrDoctors)
    return (
      <div className="section-outstandingdoctor">
        <div className="outstandingdoctor-content">
          <div className="outstandingdoctor-header">
            <span>Bác sĩ nổi bật</span>
            <button>Xem thêm </button>
          </div>
          <Slider {...this.props.settings}>
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64 = ''
                if(item.image) {
                  imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                }
                console.log(imageBase64)
                let nameVi = `${item.positionData.valueVi}, ${item.fistName} ${item.lastName}`
                let nameEn = `${item.positionData.valueEn}, ${item.fistName} ${item.lastName}`

                return (
                  <div className="outstandingdoctor-body" key={index}>
                    <div className="img-doctor" 
                    style={{backgroundImage: `url(${imageBase64})` }} />
                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                    <div>chuyên khoa</div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorRedux: state.admin.topDoctor,
    language: state.app.language,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctorStart: () => dispatch(actions.getTopDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
