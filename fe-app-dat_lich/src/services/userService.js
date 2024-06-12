import axios  from "../axios";

const handleLoginAPI = (email, password) => {
    // Truyền email và password như dữ liệu body trong yêu cầu POST
    return axios.post('/api/login', { email: email, password:password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUser = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const updateUser = (data) => {
    return axios.put('/api/edit-user', data)
}

const getAllCode = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveInfoDoctor = (data) => {
    return axios.post('/api/save-info-doctor', data)
}

const getDetailInfoDoctorService = (id) => {
    return axios.get(`/api/get-info-doctor?id=${id}`)
}

const saveBulkDoctorSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}


const postPatientAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`,data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`,data)
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`,data)
}


const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}


const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic= (data) => {
    return axios.post(`/api/create-new-clinic`,data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const getAllDetailClinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}

const updateClinic = (data) => {
    return axios.put(`/api/update-clinic`,data)
}
const deleteClinic = (id) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: id
        }
    })
}

const getListPatientForDoctor = (doctorId) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}`)
}

const successBooking = (bookId) => {
    return axios.put(`/api/success-appointment?bookId=${bookId}`)
}


const updateSpecialty = (data) => {
    return axios.put(`/api/update-specialty`,data)
}

const deleteSpecialty = (id) => {
    return axios.delete('/api/delete-specialty', {
        data: {
            id: id
        }
    })
}




export { handleLoginAPI, getAllUsers , createNewUser , 
    deleteUser, updateUser , getAllCode, 
    getTopDoctorService ,getAllDoctorService, saveInfoDoctor,
    getDetailInfoDoctorService,saveBulkDoctorSchedule,
    getScheduleDoctorByDate,getExtraInforDoctorById,getProfileDoctorById,
    postPatientAppointment,postVerifyBookAppointment,createNewSpecialty,
    getAllSpecialty,getAllDetailSpecialtyById,createNewClinic,
    getAllClinic,getAllDetailClinicById,updateClinic,deleteClinic,getListPatientForDoctor,
    successBooking,updateSpecialty,deleteSpecialty
};
