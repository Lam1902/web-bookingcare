
const { raw } = require('body-parser')
const db = require('../models/index')
const {createNewUser, getAllUser , getUserById , updateUser, deleteUserById} = require('../services/CRUD')

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render("homepage" , {data: JSON.stringify(data)})
    } catch(e) {
        console.log(e)
    }
    
}   

let getCRUD = async (req, res) => {
    return res.render('crud')
}

let postCrud = async (req, res) => {
    let message = await createNewUser(req.body)
    console.log(message)
    return res.send('tao nguoi dung moi')
}

let displayGetCrud = async (req, res) => {
    let data = await getAllUser()
    return res.render("displayCRUD.ejs", { data: data })
}


let editCrud =async (req, res) => {
    
        let userId = req.query.id
        if(userId) {
        let userData = await getUserById(userId)
        return res.render('editCRUD' , { userData : userData })

        } else {
            return res.send('Usser not found')
        }
}

let putCrud =  async (req, res) => {
    let data = req.body
    let allUsers = await updateUser(data)
    return res.render("displayCRUD.ejs", { data: allUsers })
 
}

const deleteCrud = async(req, res) => {
    let id = req.query.id
    console.log(id)
    if(id) {
         await deleteUserById(id)
       return res.send("xóa thành công")
    } else {
        return res.send("not found user")
    }

  
}

module.exports = {
    getHomePage,
    getCRUD,
    postCrud,
    displayGetCrud,
    editCrud,
    putCrud,
    deleteCrud,
}