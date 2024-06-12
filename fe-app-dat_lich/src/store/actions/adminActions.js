import actionTypes from "./actionTypes";
import {
  getAllCode,
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getTopDoctorService,
  getAllDoctorService,
  saveInfoDoctor,
  getDetailInfoDoctorService,
  getAllSpecialty,
  getAllClinic
} from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllCodeStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.GET_GENDER_START })
      let res = await getAllCode("GENDER");
      if (res.errCode === 0) {
        dispatch(getAllCodeSuccess(res.data));
      } else {
        dispatch(getAllCodeFail());
      }
    } catch (e) {
      dispatch(getAllCodeFail());
      console.log("frechAllCodeStart: ", e);
    }
  };
};

export const getAllCodeSuccess = (genderData) => ({
  type: actionTypes.GET_GENDER_SUCCESS,
  data: genderData,
});

export const getAllCodeFail = () => ({
  // type: actionTypes.FRECH_GENDER_END
});

export const getPositionSuccess = (positionData) => ({
  type: actionTypes.GET_POSITION_SUCCESS,
  data: positionData,
});

export const getPositionFail = () => ({
  type: actionTypes.GET_POSITION_FAIL,
});

export const getRoleSuccess = (roleData) => ({
  type: actionTypes.GET_ROLE_SUCCESS,
  data: roleData,
});

export const getRoleFail = () => ({
  type: actionTypes.GET_ROLE_FAIL,
});

export const getPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("POSITION");
      if (res.errCode === 0) {
        dispatch(getPositionSuccess(res.data));
      } else {
        dispatch(getPositionFail());
      }
    } catch (e) {
      dispatch(getPositionFail());
      console.log("frechAllCodeStart: ", e);
    }
  };
};

export const getRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.GET_GENDER_START })
      let res = await getAllCode("ROLE");
      if (res.errCode === 0) {
        dispatch(getRoleSuccess(res.data));
      } else {
        dispatch(getRoleFail());
      }
    } catch (e) {
      dispatch(getRoleFail());
      console.log("frechAllCodeStart: ", e);
    }
  };
};

export const createNewUserRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);
      console.log("create: ", res);
      if (res.errCode === 0) {
        toast.success("Tạo mới người dùng thành công");
        dispatch(createNewUserSuccess());
        dispatch(getUserStart());
      } else {
        dispatch(createNewUserFail());
      }
    } catch (e) {
      dispatch(createNewUserFail());
    }
  };
};

export const createNewUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

export const createNewUserFail = () => ({
  type: actionTypes.SAVE_USER_FAIL,
});

export const getUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      // let res1 = await getTopDoctor(3)
      if (res.errCode === 0) {
        dispatch(getUserSuccess(res.users.reverse()));
      } else {
        dispatch(getRoleFail());
      }
    } catch (e) {
      dispatch(getUserFail());
      console.log("GetAllUser: ", e);
    }
  };
};

export const getUserSuccess = (data) => ({
  type: actionTypes.GET_USER_SUCCESS,
  data: data,
});

export const getUserFail = () => ({
  type: actionTypes.GET_USER_FAIL,
});

export const deleteUserRedux = (userId) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.GET_GENDER_START })
      let res = await deleteUser(userId);
      console.log("create: ", res);
      if (res.errCode === 0) {
        toast.success("Xóa người dùng thành công");
        dispatch(deleteUserSuccess());
        dispatch(getUserStart());
      } else {
        dispatch(deleteUserFail());
      }
    } catch (e) {
      dispatch(deleteUserFail());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const updateUserRedux = (userInfo) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.GET_GENDER_START })
      let res = await updateUser(userInfo);
      console.log("Update user data by redux: ", res);
      if (res.errCode === 0) {
        toast.success("Cập nhật người dùng thành công");
        dispatch(updateUserSuccess());
        dispatch(getUserStart());
      } else {
        dispatch(updateUserFail());
      }
    } catch (e) {
      dispatch(updateUserFail());
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});
export const updateUserFail = () => ({
  type: actionTypes.UPDATE_USER_FAIL,
});

export const getTopDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorService();
      if (res.errCode === 0) {
        dispatch(getTopDoctorSuccess(res.data));
      } else {
        dispatch(getTopDoctorFail());
      }
    } catch (e) {
      dispatch(getTopDoctorFail());
      console.log("Getdoctor: ", e);
    }
  };
};

export const getTopDoctorSuccess = (data) => ({
  type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
  data: data,
});

export const getTopDoctorFail = () => ({
  type: actionTypes.GET_TOP_DOCTOR_FAIL,
});

export const getAllDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res.errCode === 0) {
        // console.log("res: ", res.data);
        dispatch(getAllDoctorSuccess(res.data));
      } else {
        dispatch(getAllDoctorFail());
      }
      // console.log("check res data get all doctor", res.data)
    } catch (e) {
      dispatch(getAllDoctorFail());
      console.log("Get all doctor: ", e);
    }
  };
};

export const getAllDoctorSuccess = (data) => ({
  type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
  dataDt: data,
});

export const getAllDoctorFail = () => ({
  type: actionTypes.GET_ALL_DOCTOR_FAIL,
});

export const saveInfoDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      console.log('check data gửi lên: ', data.action)
      let res = await saveInfoDoctor(data);
      console.log('check res gửi về: ', res)
      if (res.errCode === 0) {
        if (data.action === 'EDIT') {
          toast.success("Cập nhật thành công");
        } else {
          toast.info("Tạo mới thành công");
        }
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Lỗi lưu thông tin bác sĩ");
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
        });
      }
      // console.log("check res data get all doctor", res.data)
    } catch (e) {
      dispatch({
        type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
      });
      console.log("Get all doctor: ", e);
    }
  };
};

export const getInforDoctorStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailInfoDoctorService(id);
      console("check 9: ", res.data);
      if (res.errCode === 0) {
        let data = res.data;
        dispatch({
          type: actionTypes.GET_INFO_DOCTOR_SUCCESS,
          infDoctor: data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_INFO_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.GET_INFO_DOCTOR_FAIL,
      });
      console.log("Get all doctor: ", e);
    }
  };
};

export const getAllCodeTimeStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.GET_GENDER_START })
      let res = await getAllCode("TIME");
      if (res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_ALLCODE_TIME_SUCCESS,
          dtschedule: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALLCODE_TIME_FAIL,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.GET_ALLCODE_TIME_FAIL,
      });
      console.log("frechAllCodeStart: ", e);
    }
  };
};

export const getRequireDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });

      let resPrice = await getAllCode("PRICE");
      let resPayment = await getAllCode("PAYMENT");
      let resProvince = await getAllCode("PROVINCE");
      let resSpecialty = await getAllSpecialty()
      let resClinic =  await getAllClinic()

      if (resPrice &&resPrice.errCode === 0 
        &&resPayment &&resPayment.errCode === 0 
        &&resProvince &&resProvince.errCode === 0 
        && resSpecialty && resSpecialty.errCode ===0
        && resClinic && resClinic.errCode === 0 
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data
        };

        console.log('check data 1: ', data)
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch( fetchRequiredDoctorInforFail()  );
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFail());
      // console.log(" check loi ", e);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  datamore: data,
});

export const fetchRequiredDoctorInforFail = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

