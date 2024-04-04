const {handleUserLogin , getAllUsers, createNewUser , deleteUser , updateUser, getAllCodeService} = require ('../services/userService.js')

const handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
  
    if ( !email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters'
        })
    }

    let userData = await handleUserLogin(email, password)

    return res.status(200).json({
       errCode: userData.errCode,
       message: userData.message,
       userdata: userData,
    })
}

const handleGetAllUser = async (req,res) => {

    let id = req.query.id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            message:'Get user fail, not id',
            users: []
            
        })
    }
    let users = await getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        message:'Get user done',
        users
        
    })
}

let handleCreateNewUser =  async(req, res) => {
    let message = await createNewUser(req.body) 
    return res.status(200).json(message)
}
let handleDeleteUser = async(req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Chưa truyền id vào hàm xử lí'
        })
    }
    let message = await deleteUser(req.body.id) 
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await updateUser(data)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try{
        // setTimeout(() => {

        // },5000)
        let data = await getAllCodeService(req.query.type)
        return res.status(200).json(data)
    }catch (e) {
        console.log("get all code error : ", e)
        return res.status(200).json({
            errCode: -1,
            message: "error from server"
        })
    } 
}
module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleDeleteUser, 
    handleEditUser,
    getAllCode,
}