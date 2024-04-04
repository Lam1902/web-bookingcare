const express = require('express')
let { getHomePage , getCRUD , postCrud, displayGetCrud , editCrud , putCrud, deleteCrud,}   = require('../controllers/homeController')
let {handleLogin,  handleGetAllUser , handleCreateNewUser , handleDeleteUser, handleEditUser, getAllCode} = require('../controllers/userController')

let router = express.Router()
let {getTopDoctorController} = require('../controllers/doctorController')

 
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

    router.get('/api/get-top-doctor', getTopDoctorController)
    
    return app.use('/', router)

}



module.exports = initWebRoutes