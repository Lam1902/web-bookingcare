import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from "../../../services/userService";
import {withRouter} from 'react-router'

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
      isOpenModal: false
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleClickSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`)
  }

  closeBookingClose = () => {
    this.setState({
      isOpenModal: false
    });
  }


  render() {
    let { dataSpecialty } = this.state;
    console.log('check data chuyen khoa: ', dataSpecialty)
    return (
      <div className="section-specialty">
        <div className="specialty-content">
          <div className="specialty-header">
            <span>Chuyên khoa phổ biến</span>
            <button>Xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleClickSpecialty(item)}
                    >
                      <div className="bg-image section-specialty">
                        <img src={`data:image/png;base64,`+item.image} alt="Ảnh" />
                      </div>
                      <div className="specialty-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Specialty));
