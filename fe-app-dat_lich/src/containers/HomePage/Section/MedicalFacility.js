import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./MedicalFacility.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/userService";
import {withRouter} from 'react-router'



class MedicalFacility extends Component {

  constructor(props) {
    super(props)

    this.state = {
      listClinic: []
    }
  }

  async componentDidMount  () {
    let res = await getAllClinic()
    if(res && res.errCode === 0 ) {
      this.setState({
        listClinic: res.data ? res.data : []
      })
    }
  }

  handleViewDetailClinic = (clinic) => {
    if(this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`)
    }
  }
 
  render() {

    let {listClinic} = this.state
    console.log('all clinic: ', listClinic)
    return (
      <div className="section-medical">
        <div className="medical-content">
          <div className="medical-header">
              <span>Cơ sở y tế nổi bật</span>
              <button>Xem thêm </button>
          </div>
          <div className="medical-body" >
          <Slider {...this.props.settings}>
            {listClinic && listClinic.length > 0 
            && listClinic.map((item, index) => {
              return(
                <div className="clinic"
                key={index}
                onClick={() => this.handleViewDetailClinic(item)}
                >
               <img src={`data:image/png;base64,`+item.image} alt="Ảnh" />
                  <div className="clinic-name">{item.name}</div>
                </div>
              )
            })
            }
          </Slider>
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
