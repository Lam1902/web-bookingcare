import React, { Component } from "react";
import { connect } from "react-redux";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailClinic.scss";
import _ from "lodash";
import { getAllClinic, getAllDetailClinicById, getAllCode } from '../../../services/userService';
import { LANGUAGES } from "../../../utils/constant";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      console.log('id', id)
      let res = await getAllDetailClinicById(id);
      console.log('this res: ', res)
      if (res && res.errCode === 0) {
        let data = res.data;
        let listDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.forEach((item) => {
              listDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailClinic: res.data,
          listDoctorId: listDoctorId,
        });
      }
    }
  }

  render() {
    let { listDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;

    console.log('this: ', this.state)
    return (
      <div className="detail-specialty-container">
        <HomeHeader s />
        <div style={{marginTop:100}} className="detail-specialty-body">
          
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
            <div className="description-specialty">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div>{dataDetailClinic.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>
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
)(DetailClinic);
