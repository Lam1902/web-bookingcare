import React, { Component } from "react";
import { connect } from "react-redux";
import DoctorSchedule from "../../../Patient/Doctor/DoctorSchedule";
import DoctorExtraInfo from "../../../Patient/Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../../Patient/Doctor/ProfileDoctor";
import HomeHeader from "../../HomeHeader";
import "./DetailSpecialty_modal.scss";
import _ from "lodash";
import {
  getAllCode,
  getAllDetailSpecialtyById,
} from "../../../../services/userService";
import { LANGUAGES } from "../../../../utils/constant";

class DetailSpecialty_modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let data = {
        id: id,
        location: "ALL",
      };
      let res = await getAllDetailSpecialtyById(data);

      let resProvince = await getAllCode("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let listDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.forEach((item) => {
              listDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data
        if(dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: 'Null',
            keyMap:'ALL',
            type:'PROVINCE',
            valueVi:'Toàn quốc',
            valueEn:'ALL'
          })
        }
        this.setState({
          dataDetailSpecialty: res.data,
          listDoctorId: listDoctorId,
          listProvince: resProvince.data, // đảm bảo resProvince.data là một mảng
        });
      }
    }
  }

  handleOnChangeSelect =  async (event) => {
   if(this.props.match && this.props.match.params && this.props.match.params.id) {
    let id = this.props.match.params.id
    let location = event.target.value

    let data = {
      id: id,
      location: location,
    };
    let res = await getAllDetailSpecialtyById(data);
    if (
      res &&
      res.errCode === 0 
    ) {
      let data = res.data;
      let listDoctorId = [];
      if (data && !_.isEmpty(res.data)) {
        let arr = data.doctorSpecialty;
        if (arr && arr.length > 0) {
          arr.forEach((item) => {
            listDoctorId.push(item.doctorId);
          });
        }
      }

      this.setState({
        dataDetailSpecialty: res.data,
        listDoctorId: listDoctorId
      })
    }
   }
  };

  render() {
    let { listDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select onChange={this.handleOnChangeSelect}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => (
                  <option key={index} value={item.keyMap}>
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </option>
                ))}
            </select>
          </div>
          {listDoctorId &&
            listDoctorId.length > 0 &&
            listDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="each-doctor-left">
                    <div className="profileDoctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      ></ProfileDoctor>
                    </div>
                  </div>
                  <div className="each-doctor-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra">
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailSpecialty_modal);
