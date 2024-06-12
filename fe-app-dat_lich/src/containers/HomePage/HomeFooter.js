import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About BookingCare</h2>
            <p>
              BookingCare.vn is your trusted healthcare service provider,
              connecting you with top doctors and medical facilities.
              Our mission is to make healthcare accessible and convenient for everyone.
            </p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section social">
            <h2>Follow Us</h2>
            <ul>
              <li>
                <a href="https://www.tiktok.com">
                  <FontAwesomeIcon icon={faTiktok} /> TikTok
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com">
                  <FontAwesomeIcon icon={faFacebook} /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com">
                  <FontAwesomeIcon icon={faYoutube} /> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="https://bookingcare.vn/">&copy; 2024 BookingCare.vn</a>
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
