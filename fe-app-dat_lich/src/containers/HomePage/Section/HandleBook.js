import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./MedicalFacility.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/handle-book-img/111302-nha-khoa-nieng-rang-tra-gop-sinh-vien.png"



class MedicalFacility extends Component {
 
  render() {

    return (
      <div className="section-medical">
        <div className="medical-content">
          <div className="medical-header">
              <span>Cẩm nang sức khỏe</span>
              <button>Xem thêm </button>
          </div>
          <Slider {...this.props.settings}>
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Cẩm nang sức khỏe 1</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Cẩm nang sức khỏe 2</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Cẩm nang sức khỏe 3</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Cẩm nang sức khỏe 4</div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Cẩm nang sức khỏe 5 </div>
            </div >
            <div className="medical-body" >
              <img src={specialtyImg} />
              <div>Cẩm nang sức khỏe 6</div>
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
