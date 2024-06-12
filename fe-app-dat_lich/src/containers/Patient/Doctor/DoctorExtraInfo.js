import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DoctorExtraInfo.scss";
import { getDetailInfoDoctorService } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import DoctorSchedule from "./DoctorSchedule";
import { getExtraInforDoctorById } from "../../../services/userService";
import { NumericFormat } from 'react-number-format';

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if(this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
      if(res && res.errCode ===0 ) {
        this.setState({
          extraInfor: res.data
        })
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHidenDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    return (
      <div className="infor-container">
        <div className="content-up">
          {/* <div className="address" >Địa chỉ khám:{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : 'Tên phòng khám'} </div> */}
          <div className="clinic">
            Tên phòng khám:{" "}
            {extraInfor && extraInfor.nameClinic
              ? extraInfor.nameClinic
              : "Tên phòng khám"}
          </div>
          <div className="detail-address">
            Địa chỉ:{" "}
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : "Địa chỉ phòng khám"}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
            Giá khám: {extraInfor && extraInfor.priceTypeData && (
              language === LANGUAGES.VI ? 
                <NumericFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix={"VND"}
                  renderText={(value) => <span>{value}</span>}
                /> :
                <NumericFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                  renderText={(value) => <span>{value}</span>}
                />
            )}
           <div>
           <span
              className="btn-an"
              onClick={() => this.showHidenDetailInfor(true)}
            >
              Xem chi tiết
            </span>
           </div>
          </div>
          )}

          {isShowDetailInfor === true && (
            <>
              <div className="detail-infor">
                <div className="detail-price">
                  <span className="left">Giá khám: </span>
                  <span className="rigth">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumericFormat
                          className="currency"
                          value={extraInfor.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}

                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumericFormat
                          className="currency"
                          value={extraInfor.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">Ghi chú: {extraInfor && extraInfor.note ? extraInfor.note : "ghi chu"}
                </div>
                <div className="payment">
                  Phương thức thanh toán:  {extraInfor &&
                  extraInfor.paymentTypeData &&
                  language === LANGUAGES.VI
                    ? extraInfor.paymentTypeData.valueVi
                    : extraInfor.paymentTypeData.valueEn}
                </div>
                <div className="hiden-price">
                  <span
                    className="btn-an"
                    onClick={() => this.showHidenDetailInfor(false)}
                  >
                    Ẩn giá
                  </span>
                </div>
              </div>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
