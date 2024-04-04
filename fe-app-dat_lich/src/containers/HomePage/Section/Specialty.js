import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specailty/101627-co-xuong-khop.png"
import thankinh from "../../../assets/specailty/101739-than-kinh.png"
import tieuhoa from "../../../assets/specailty/101713-tieu-hoa.png"
import timmach from "../../../assets/specailty/101713-tim-mach.png"
import taimuihong from "../../../assets/specailty/101713-tai-mui-hong.png"
import cotsong from "../../../assets/specailty/101627-cot-song.png"



class Specialty extends Component {
 
  render() {
    return (
      <div className="section-specialty">
        <div className="specialty-content">
          <div className="specialty-header">
              <span>Chuyên khoa phổ biến</span>
              <button>Xem thêm </button>
          </div>
          <Slider {...this.props.settings}>
            <div className="specialty-body" >
              <img src={specialtyImg} />
              <div>Cơ xương khớp </div>
            </div >
            <div className="specialty-body" >
              <img src={thankinh} />
              <div>Thần kinh</div>
            </div >
            <div className="specialty-body" >
              <img src={tieuhoa} />
              <div>Tiêu hóa</div>
            </div >
            <div className="specialty-body" >
              <img src={timmach} />
              <div>Tim mạch</div>
            </div >
            <div className="specialty-body" >
              <img src={taimuihong} />
              <div>Tai mũi họng</div>
            </div >
            <div className="specialty-body" >
              <img src={cotsong} />
              <div>Cột sống</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
