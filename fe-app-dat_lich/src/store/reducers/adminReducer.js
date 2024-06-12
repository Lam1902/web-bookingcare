import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  roles: [],
  positions12: [],
  isLoadingGender: false,
  users: [],
  topDoctor: [],
  listDoctor: [],
  inforDoctor: {},
  doctorSchedule: [],
  thongtinthem: {},
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENDER_START:
      state.gender = action.data;
      state.isLoadingGender = true;
      return {
        ...state,
      };

    case actionTypes.GET_GENDER_SUCCESS:
      state.gender = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };

    case actionTypes.FRECH_GENDER_END:
      state.gender = {};
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.GET_POSITION_SUCCESS:
      state.positions12 = action.data;
      return {
        ...state,
      };

    case actionTypes.GET_POSITION_FAIL:
      state.positions = {};
      return {
        ...state,
      };
    case actionTypes.GET_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };

    case actionTypes.GET_ROLE_FAIL:
      state.roles = {};
      return {
        ...state,
      };

    case actionTypes.GET_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };

    case actionTypes.GET_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.GET_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_DOCTOR_FAIL:
      state.topDoctor = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_SUCCESS:
      state.listDoctor = action.dataDt;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_FAIL:
      state.listDoctor = [];
      return {
        ...state,
      };
    case actionTypes.GET_INFO_DOCTOR_SUCCESS:
      state.inforDoctor = action.infDoctor;
      return {
        ...state,
      };
    case actionTypes.GET_INFO_DOCTOR_FAIL:
      state.inforDoctor = {};
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_TIME_SUCCESS:
      state.doctorSchedule = action.dtschedule;
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_TIME_FAIL:
      state.doctorSchedule = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.thongtinthem = action.datamore;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.thongtinthem = {};
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
