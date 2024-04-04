import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./About.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import itemLogo from "../../../assets/vtv1 (1).png";
import logoVNexpress from "../../../assets/logo-about/vnexpress.png"
import logoBoyte from "../../../assets/logo-about/cuc-cong-nghe-thong-tin-bo-y-te-2.png"
import logodantri from "../../../assets/logo-about/110757-dantrilogo.png"
import logoVtc from "../../../assets/logo-about/165432-vtcnewslogosvg.png"

class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="about-header">Truyền thông nói về BookingCare</div>
        <div className="about-body">
          <div className="about-left">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/7tiR7SI4CkI?si=5dAAxTy0mHrlt5c9" 
          title="YouTube video player" 
          frameorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
           referrerpolicy="strict-origin-when-cross-origin" 
           allowfullscreen></iframe>
          </div>
          <div className="about-right">
            <div className="about-right-column">
              <div className="about-rigth-item">
                <img src={itemLogo} />
              </div>
              <div className="about-rigth-item">
                <img src={logoVNexpress} />
              </div>
              <div className="about-rigth-item">
                <img src={logoBoyte} />
              </div>
              <div className="about-rigth-item">
                <img src={logodantri} />
              </div>
            </div>
            <div className="about-right-column">
              <div className="about-rigth-item">
                <img src={logoVtc} />
              </div>
              <div className="about-rigth-item">
                <img src={itemLogo} />
              </div>
              <div className="about-rigth-item">
                <img src={itemLogo} />
              </div>
              <div className="about-rigth-item">
                <img src={itemLogo} />
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
