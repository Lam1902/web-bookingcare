const express = require('express')
let { getHomePage , getCRUD , postCrud, displayGetCrud , editCrud , putCrud, deleteCrud,}   = require('../controllers/homeController')
let {handleLogin,  handleGetAllUser , handleCreateNewUser , handleDeleteUser, handleEditUser, getAllCode} = require('../controllers/userController')

let router = express.Router()
let {getTopDoctorController , getAllDoctorController, 
    saveInfoDoctor ,getInfoDoctor, bulkCreateSchedule, getScheduleByDate ,getExtraInforDoctorById ,
    getProfileDoctorById ,getListPatient} = require('../controllers/doctorController')

let {postBookAppointment , postVerifyBook, handleSuccessAppointment } = require('../controllers/patientController')
let {createNewSpecialty,getAllSpecialty,handleUpdateSpecialty,
     getDetailSpecialtyById ,handleDeleteSpecialty} = require('../controllers/specialtyController')
let {createNewClinic, getAllClinic ,getDetailClinicById, handleDeleteClinic ,handleUpdateClinic} = require('../controllers/clinicController')

let initWebRoutes = (app) => {



    router.get('/', getHomePage)
    router.get('/crud', getCRUD)
    router.post('/post-crud', postCrud)
    router.get('/get-crud', displayGetCrud )
    router.get('/edit', editCrud )

    router.post('/put-crud', putCrud)
    router.get('/delete-user', deleteCrud)

    //handle client request
    router.post('/api/login', handleLogin)
    router.get('/api/get-all-users', handleGetAllUser)
    router.post('/api/create-new-user', handleCreateNewUser)
    router.put('/api/edit-user', handleEditUser)
    router.delete('/api/delete-user', handleDeleteUser)

    router.get('/api/allcode',getAllCode)

    //handle doctor
    router.get('/api/get-top-doctor', getTopDoctorController)
    router.get('/api/get-all-doctor', getAllDoctorController)
    router.post('/api/save-info-doctor', saveInfoDoctor)
    router.get('/api/get-info-doctor', getInfoDoctor)
    router.post('/api/bulk-create-schedule', bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date',getScheduleByDate)
    //api lấy thông tin địa chỉ , giá khám bác sĩ
    router.get('/api/get-extra-infor-doctor-by-id',getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', getProfileDoctorById)
    router.get('/api/get-list-patient-for-doctor',getListPatient)

    //patient 
    router.post('/api/patient-book-appointment', postBookAppointment)
    router.post('/api/verify-book-appointment', postVerifyBook)
    router.put('/api/success-appointment', handleSuccessAppointment)

    //Specialty
    router.post('/api/create-new-specialty', createNewSpecialty)
    router.get('/api/get-specialty', getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id', getDetailSpecialtyById)
    router.delete('/api/delete-specialty', handleDeleteSpecialty)
    router.put('/api/update-specialty', handleUpdateSpecialty)

    //clinic 
    router.post('/api/create-new-clinic', createNewClinic)
    router.get('/api/get-clinic', getAllClinic)
    router.get('/api/get-detail-clinic-by-id', getDetailClinicById)
    router.delete('/api/delete-clinic', handleDeleteClinic)
    router.put('/api/update-clinic', handleUpdateClinic)
    
    return app.use('/', router)

}



module.exports = initWebRoutes