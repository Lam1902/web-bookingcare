import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  roles: [],
  positions12: [],
  isLoadingGender: false,
  users: [],
  topDoctor: [],
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
    default:
      return state;
  }
};

export default adminReducer;
