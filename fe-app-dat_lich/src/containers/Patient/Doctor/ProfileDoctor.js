import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import { getProfileDoctorById } from "../../../services/userService";
import { NumericFormat } from "react-number-format";
import "./ProfileDoctor.scss";
import _ from 'lodash'
import moment from "moment/moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.doctorId !== this.props.doctorId) {
      let data = await this.getInforDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }

  getInforDoctor = async (doctorId) => {
    let result = {};
    if (doctorId) {
      let res = await getProfileDoctorById(doctorId);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let {language} = this.props 
    if(dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

      let date = language === LANGUAGES.VI ? 
      moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
      :
      moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')

      return (
        <>
        <div>{time} - {date}</div>
        <div>Miễn phí đặt lịch</div>
        </>
      )
    }
    return <></>
  }

  render() {
    let { dataProfile } = this.state;
    let { language , isShowDescriptionDoctor, dataTime ,isShowPrice, isShowLinkDetail , doctorId} = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName} ${dataProfile.fistName} `;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.fistName} ${dataProfile.lastName}`;
    }


    console.log('check data: ',this.state.dataProfile)
    return (
      <div className="intro-doctor">
        <div
          className="content-left"
          style={{
            backgroundImage: `url(${dataProfile.image ? dataProfile.image : 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg' })`,
          }}
        ></div>
        <div className="content-right">
          <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
          <div className="down">
            {/* {dataProfile.Markdown && dataProfile.Markdown.description && (
              <span>{dataProfile.Markdown.description}</span>
            )} */}

            { isShowDescriptionDoctor === true ? 
            <>
            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description 
            && 
            <span>{dataProfile.Markdown.description}</span>
            }
            </>
            :
            <>
            {this.renderTimeBooking(dataTime)}
            </>
            }
          </div>
          {isShowLinkDetail === true && 
          <div className="view-detail-doctor">
           <Link to={`/detail-doctor/${doctorId}`}>
                    Xem thêm
                  </Link>
          </div>
            }
            {isShowPrice === true && 
             <div className="price">
             Giá khám:{" "}
             {dataProfile && dataProfile.Doctor_Infor && (
               language === LANGUAGES.VI ? (
                 <NumericFormat
                   className="currency"
                   value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                   displayType={"text"}
                   thousandSeparator="."
                   decimalSeparator=","
                   suffix={" VND"}
                   renderText={(value) => <span>{value}</span>}
                 />
               ) : (
                 <NumericFormat
                   className="currency"
                   value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                   displayType={"text"}
                   thousandSeparator={true}
                   suffix={" $"}
                   renderText={(value) => <span>{value}</span>}
                 />
               )
             )}
           </div>
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
