import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES , dateFormat} from "../../../utils";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from "moment";
import {saveBulkDoctorSchedule} from '../../../services/userService'


class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedDoctor: {},
      currentDate: new Date(),
      doctorSchedule: [],
      rangeTime: []
    };
  }

  componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getAllScheduleTime()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDoctorRedux !== this.props.listDoctorRedux) {
      let listDt = this.builtDataInputSelect(this.props.listDoctorRedux);
      this.setState({
        listDoctor: listDt,
      });
    }

    if(prevProps.doctorScheduleRedux !== this.props.doctorScheduleRedux) {
        let data = this.props.doctorScheduleRedux
        if(data && data.length > 0){
            data = data.map(item => ({
                ...item , isSelected: false
            }))
        }
        this.setState({
            doctorSchedule: data
        })
    }
  }

  builtDataInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let obj = {};
        let labelVi = `${item.lastName} ${item.fistName}`;
        let labelEn = `${item.fistName} ${item.lastName}`;

        obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
  };

  handleChangeDatePicker = (date) => {
    this.setState({
        currentDate: date[0]
    })
  };

  handleClickBtnTime =(time) => {
    let {doctorSchedule} = this.state
    if(doctorSchedule && doctorSchedule.length>0) {
        doctorSchedule = doctorSchedule.map(item => {
            if(item.id === time.id) item.isSelected = !item.isSelected;
            return item
        })
        this.setState({
            doctorSchedule: doctorSchedule
        })
    }
    console.log(time)
  }



  handleSaveDoctorSchedule = async () => {
    let { doctorSchedule , selectedDoctor, currentDate } = this.state
    let result = []
    if(!currentDate) {
        toast.warn("Vui lòng chọn ngày ");
        return
    }
    if(selectedDoctor && _.isEmpty(selectedDoctor)) {
        toast.warn("Vui lòng chọn bác sĩ ");
        return
    }

    let formattedDate = new Date(currentDate).getTime()
    if(doctorSchedule && doctorSchedule.length > 0) {
        let selectedTime = doctorSchedule.filter(item => item.isSelected === true)
        if(selectedTime && selectedTime.length > 0){
            selectedTime.map( (schedule,index) => {
                let obj = {}
                obj.doctorId = selectedDoctor.value
                obj.date = formattedDate
                obj.timeType = schedule.keyMap
                result.push(obj)
            })
        }else {
            toast.warn("Vui lòng chọn khung giờ ");
            return
        }
    }

    let res = await saveBulkDoctorSchedule({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate
    })

    toast.success("Thêm lịch khám thành công");
    console.log('check res: ', res)
    console.log('check kq: ', result)

  }

  render() {
    let {doctorSchedule} = this.state
    let {language} = this.props
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1))
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title"></FormattedMessage>
        </div>
        <div className="m-s-body container">
          <div className="row">
            <div className="col-4 form-group">
              <label>chọn bác sĩ</label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctor}
                className="select-doctor"
              />
            </div>
            <div className="col-4 form-group">
              <label>chọn ngày</label>
              <DatePicker
                onChange={this.handleChangeDatePicker}
                className="form-control"
                value = {this.state.currentDate}
                minDate={yesterday}
              
              />
            </div>
            <div className="col-8 form-group select-time">
              <label style={{color: "white"}} >chọn khung giớ</label>
              <div>
              {doctorSchedule && doctorSchedule.length>0 && 
              doctorSchedule.map((item, index) => {
                    return (
                        <button className={item.isSelected === true ? "btn btn-time active" : "btn btn-time" }
                        key={index} onClick={() => this.handleClickBtnTime(item)} >
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </button>
                    )
              })}
              </div>
            </div>
          </div>
          <div className="row">
            <button className="col-1 btn btn-success"
            onClick={()=> this.handleSaveDoctorSchedule()} 
            > Lưu thông tin</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctorRedux: state.admin.listDoctor,
    language: state.app.language,
    doctorScheduleRedux: state.admin.doctorSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctorStart()),
    getAllScheduleTime: () => dispatch(actions.getAllCodeTimeStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
