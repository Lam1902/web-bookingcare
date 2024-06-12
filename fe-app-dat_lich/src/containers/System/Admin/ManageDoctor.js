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
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInfoDoctorService } from "../../../services/userService";

const mdParser = new MarkdownIt();
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHtml: "",
      selectedOption: "",
      description: "",
      hasOldData: false,

      //thong tin bang doctor_infor
      listDoctor: [],
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty:[],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic:"",
      selectedSpecialty:"",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: '',
      specialtyId:'',


     
    };
  }

  async componentDidMount() {
    this.props.getAllDoctorRedux();
    this.props.getAllRequireDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState) {
    const { listDoctorRedux, language, allRequireDoctorInfor } = this.props;

    if (prevProps.listDoctorRedux !== listDoctorRedux) {
      const listDoctor = this.builtDataInputSelect(listDoctorRedux, "USER");
      this.setState({ listDoctor });
    }

    if (
      prevProps.language !== language ||
      prevProps.allRequireDoctorInfor !== allRequireDoctorInfor
    ) {
      const { resPayment, resPrice, resProvince , resSpecialty , resClinic} = allRequireDoctorInfor;
      const listDoctor = this.builtDataInputSelect(listDoctorRedux, "USER");
      const listPrice = this.builtDataInputSelect(resPrice, "PRICE");
      const listPayment = this.builtDataInputSelect(resPayment, "PAYMENT");
      const listProvince = this.builtDataInputSelect(resProvince, "PROVINCE");
      const listSpecialty = this.builtDataInputSelect(resSpecialty,'SPECIALTY')
      const listClinic = this.builtDataInputSelect(resClinic,'CLINIC')

      this.setState({ listDoctor, listPrice, listPayment, listProvince , listSpecialty , listClinic});
    }
    // console.log('check state', this.state)
  }

  handleEditorChange = (html, text) => {
    this.setState({
      contentMarkdown: text,
      contentHtml: html,
    });
    console.log("handleEditorChange check: ", html, text);
  };

  handleSaveMarkContent = () => {
    let { hasOldData } = this.state;
    let data = {
      contentHtml: this.state.contentHtml,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? "EDIT" : "CREATE",

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      // nameClinic: this.state.nameClinic, 
      // addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      specialtyId: this.state.selectedSpecialty.value
    };
    console.log("check data gửi lên: ", data);
    this.props.saveInfoDoctorRedux(data);
  };

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    let { listPrice, listPayment, listProvince , listClinic, listSpecialty } = this.state;
    let id = selectedOption.value;
    // console.log('check selectedOption.value: ', id)
    let res = await getDetailInfoDoctorService(id);
    console.log("check data trả về: ", res);
    if (
      res &&
      res.errCode === 0 &&
      res.data &&
      res.data.data &&
      res.data.data.Markdown
    ) {
      let Markdown = res.data.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",

        paymentId = "",
        priceId = "",
        provinceId = "",
        clinicId = '',
        specialtyId='',
        // payment = "",

        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedClinic='',
        selectedSpecialty=''

        


      if (res.data.data.Doctor_Infor) {
        // console.log('check doctor infor: ', res.data.data.Doctor_Infor)
        addressClinic = res.data.data.Doctor_Infor.addressClinic;
        // nameClinic = res.data.data.Doctor_Infor.nameClinic;
        note = res.data.data.Doctor_Infor.note;
        priceId = res.data.data.Doctor_Infor.priceId;
        provinceId = res.data.data.Doctor_Infor.provinceId;
        paymentId = res.data.data.Doctor_Infor.paymentId;
        clinicId = res.data.data.Doctor_Infor.clinicId
        specialtyId = res.data.data.Doctor_Infor.specialtyId
     

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });

      }

      this.setState({
        contentHtml: Markdown.contentHtml,
        contentMarkdown: Markdown.contentMarkdown,
        description: Markdown.description,
        hasOldData: true,

        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedClinic:selectedClinic,
        selectedSpecialty: selectedSpecialty

      
      });
    } else {
      this.setState({
        contentHtml: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,

        addressClinic: "",
        nameClinic: "",
        note: "",

        selectedClinic:"",
        selectedPayment:"",
        selectedPrice:'',
        selectedProvince:'',
        selectedSpecialty:''
      });
    }
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  builtDataInputSelect = (data, type) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      if (type === "USER") {
        data.map((item, index) => {
          let obj = {};
          let labelVi = `${item.lastName}` + `${item.fistName}`;
          let labelEn = `${item.fistName}` + `${item.lastName}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.id;
          result.push(obj);
        });
      } else if (type === "PRICE") {
        data.map((item, index) => {
          let obj = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      } else if (type === "PAYMENT" || type === "PROVINCE") {
        data.map((item, index) => {
          let obj = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      } else if (type === "SPECIALTY") {
        data.map((item, index) => {
          let obj = {}
           obj.label =  item.name
           obj.value = item.id
           result.push(obj)
        })
      } else if(type === 'CLINIC') {
        data.map((item, index) => {
          let obj = {}
           obj.label =  item.name
           obj.value = item.id
           result.push(obj)
        })
      }
    }
    return result;
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOldData } = this.state;
    console.log('this.state: ', this.state)

    return (
      <div className="container-lg manage-doctor">
        <div className="manage-doctor-title" style={{ color: "white" }}>
          <h1>
            <FormattedMessage id="admin.manage-doctor.title" />
          </h1>
        </div>
        <div className="manage-doctor-body">
          <div className="doctor-item">
            <div className="doctor-name content-left form-group">
              <label>
                {" "}
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listDoctor}
                placeholder={"Chọn bác sĩ"}
              />
            </div>
            <div className="doctor-info content-right ">
              <label style={{ color: "white" }}>
                {" "}
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                className="form-control"
                rows="6"
                onChange={(event) =>
                  this.handleOnChangeDescription(event, "description")
                }
                value={this.state.description}
              >
                Nhập thông tin giới thiệu của bác sĩ
              </textarea>
            </div>
          </div>
          <div className="more-infor-extra row">
            <div className="col-4 form-group ">
              <label>Chọn giá</label>
              <Select
                value={this.state.selectedPrice}
                onChange={(selectedOption) =>
                  this.handleChangeSelectDoctorInfor(selectedOption, {
                    name: "selectedPrice",
                  })
                }
                options={this.state.listPrice}
                placeholder={"Chọn giá"}
              />
            </div>
            <div className="col-4 form-group ">
              <label>Chọn phương thức thanh toán</label>
              <Select
                value={this.state.selectedPayment}
                onChange={(selectedOption) =>
                  this.handleChangeSelectDoctorInfor(selectedOption, {
                    name: "selectedPayment",
                  })
                }
                options={this.state.listPayment}
                placeholder={"Chọn phương thức thanh toán"}
              />
            </div>
            <div className="col-4 form-group ">
              <label>Chọn tỉnh thành</label>
              <Select
                value={this.state.selectedProvince}
                onChange={(selectedOption) =>
                  this.handleChangeSelectDoctorInfor(selectedOption, {
                    name: "selectedProvince",
                  })
                }
                options={this.state.listProvince}
                placeholder={"Chọn tỉnh thành"}
              />
            </div>
            <div className="col-4 form-group">
              <label>Chọn chuyên khoa</label>
              <Select 
                value={this.state.selectedSpecialty}
                onChange={(selectedOption) =>
                  this.handleChangeSelectDoctorInfor(selectedOption, {
                    name: "selectedSpecialty",
                  })
                }
                options={this.state.listSpecialty}
                placeholder={"Chọn chuyên khoa"}
              />
            </div>
            <div className="col-4 form-group ">
              <label>Chọn phòng khám</label>
              <Select
                value={this.state.selectedClinic}
                onChange={(selectedOption) =>
                  this.handleChangeSelectDoctorInfor(selectedOption, {
                    name: "selectedClinic",
                  })
                }
                options={this.state.listClinic}
                placeholder={"Chọn phòng khám"}
              />
            </div>
            <div className="col-4 form-group tb-1">
              <label>Note</label>
              <input
                className="form-control "
                onChange={(event) => this.handleOnChangeText(event, "note")}
                value={this.state.note}
              />
            </div>
          </div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={(event) =>
              this.handleEditorChange(event.html, event.text)
            }
            value={this.state.contentMarkdown}
          ></MdEditor>
          <button
            style={{ marginTop: 20 }}
            className={
              hasOldData === true ? (
                <span>
                  {" "}
                  <FormattedMessage id="admin.manage-doctor.save" />
                </span>
              ) : (
                <span>
                  {" "}
                  <FormattedMessage id="admin.manage-doctor.add" />
                </span>
              )
            }
            onClick={() => this.handleSaveMarkContent()}
          >
            {hasOldData === true ? "Lưu thông tin" : "Tạo thông tin"}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctorRedux: state.admin.listDoctor,
    language: state.app.language,
    allRequireDoctorInfor: state.admin.thongtinthem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorRedux: () => dispatch(actions.getAllDoctorStart()),
    saveInfoDoctorRedux: (data) => dispatch(actions.saveInfoDoctorStart(data)),
    getAllRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
