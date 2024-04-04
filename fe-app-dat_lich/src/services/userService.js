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

export { handleLoginAPI, getAllUsers , createNewUser , deleteUser, updateUser , getAllCode, getTopDoctorService};
