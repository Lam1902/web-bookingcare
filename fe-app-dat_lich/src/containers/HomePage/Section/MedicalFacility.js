import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./MedicalFacility.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/medical-facility/benh-vien-y-co-truyen.jpg"



class MedicalFacility extends Component {
 
  render() {

    return (
      <div className="section-medical">
        <div className="medical-content">
          <div className="medical-header">
              <span>Cơ sở y tế nổi bật</span>
              <button>Xem thêm </button>
          </div>
          <Slider {...this.props.settings}>
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Bệnh viện đa khoa 1</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Bệnh viện đa khoa 2</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Bệnh viện đa khoa 3</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Bệnh viện đa khoa 4</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Bệnh viện đa khoa 5 </div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Bệnh viện đa khoa 6</div>
            </div >
            
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
