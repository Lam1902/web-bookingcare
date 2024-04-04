import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSuitcaseMedical,
  faCircleQuestion,
  faMagnifyingGlass,
  faHospital,
  faMobile,
  faSquareH,
  faMicroscope,
  faBrain,
  faTooth
} from "@fortawesome/free-solid-svg-icons";
import {LANGUAGES} from "../../utils/constant"
import {changeLanguage} from "../../store/actions"

class HomeHeader extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }

  render() {
    let language = this.props.language
    return (
      
      <React.Fragment>
    
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <FontAwesomeIcon icon={faBars} className="icon-bars" />
              <div className="logo">
                <FontAwesomeIcon
                  icon={faSuitcaseMedical}
                  style={{ color: "#d01111" }}
                  className="logo-icon"
                />
                <h2 className="logo-text">BookingCare</h2>
              </div>
            </div>
            <div className="center-content">
              <div className="center-content-child">
                <b> <FormattedMessage id="homeheader.speciality" /> </b>
                <div className="sub-center-content">
                <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="center-content-child">
                <b><FormattedMessage id="homeheader.health-facility" /></b>
                <div className="sub-center-content">
                <FormattedMessage id="homeheader.select-hopitial" />
                </div>
              </div>
              <div className="center-content-child">
                <b> <FormattedMessage id="homeheader.doctor" /></b>
                <div className="sub-center-content">
                <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="center-content-child">
                <b><FormattedMessage id="homeheader.examination-package" /></b>
                <div className="sub-center-content">
                <FormattedMessage id="homeheader.examination package-total" />
                </div>
              </div>
            </div>
            <div className="rigth-content">
            <div className={language === LANGUAGES.VI ? 'language-vi  action' : 'language-en'} >
                <span onClick={()=> this.changeLanguage(LANGUAGES.VI)} > VN </span>
              </div>
              <div className={language === LANGUAGES.EN ? 'language-en  action' : 'language-vi'}>
              <span onClick={()=> this.changeLanguage(LANGUAGES.EN)} > EN </span>
              </div>
              <div className="support">
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  style={{ color: "#187cc9" }}
                />{" "}
                  <FormattedMessage id="homeheader.support" />
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
            <div className="banner-top">
            <div className="banner-title">
               <div className="banner-title-1"><FormattedMessage id="banner.title1"/></div>
               <div className="banner-title-2"><FormattedMessage id="banner.title2"/></div>
            </div>
          <div className="banner-search">
            <div className="banner-search-content" >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
            <input type="text" placeholder="Tìm kiếm thông tin"/>
            </div>
          </div>
            </div>
            <div className="banner-bottom">  
            <div className="banner-option">
                <div className="banner-option-child">
                    <div className="banner-option-child-icon">
                    <FontAwesomeIcon icon={faHospital} beat style={{color: "#68d3ee",}} />
                    </div>
                    <div className="banner-option-child-text"><FormattedMessage id="banner.child1"/></div>
                </div>
                <div className="banner-option-child">
                    <div className="banner-option-child-icon">
                    <FontAwesomeIcon icon={faMobile} beat />
                    </div>
                    <div className="banner-option-child-text"><FormattedMessage id="banner.child2"/></div>
                </div>
                <div className="banner-option-child">
                    <div className="banner-option-child-icon">
                    <FontAwesomeIcon icon={faSquareH} beat />
                    </div>
                    <div className="banner-option-child-text"><FormattedMessage id="banner.child3"/></div>
                </div>
                <div className="banner-option-child">
                    <div className="banner-option-child-icon">
                    <FontAwesomeIcon icon={faMicroscope} beat />
                    </div>
                    <div className="banner-option-child-text"><FormattedMessage id="banner.child4"/></div>
                </div>
                <div className="banner-option-child">
                    <div className="banner-option-child-icon">
                    <FontAwesomeIcon icon={faBrain} beat />
                    </div>
                    <div className="banner-option-child-text"><FormattedMessage id="banner.child5"/></div>
                </div>
                <div className="banner-option-child">
                    <div className="banner-option-child-icon">
                    <FontAwesomeIcon icon={faTooth} beat />
                    </div>
                    <div className="banner-option-child-text"><FormattedMessage id="banner.child6"/></div>
                </div>
            </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    // lấy biến language từ redux
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguage(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
