import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "../HomePage/Section/About.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class HomeFooter extends Component {
 
  render() {

    return (
      <div className="home-footer">
        <a href="https://bookingcare.vn/">&copy; 2024 BookingCare.vn</a>
        <div>
          <ul>
            <li><a href="" >TikTok</a></li>
            <li><a href="">Facebook</a></li>
            <li><a href="" >Youtube</a></li>
          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
