const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const db= require('../models/index')
const { resolve } = require('path')
const { rejects } = require('assert')
const { promises } = require('dns')

let createNewUser = async (data) => {
    return new Promise( async (resolve ,reject) => {
        try {
            let hashPasswordFromBcrypt = await hasUserPassword(data.password)
             await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fistName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
            
                roleId: data.roleId,
            })

            resolve('Create a new user success')
        }catch (e) {
            reject(e)
        }
    })
   
}

let hasUserPassword = (password) => {
    return new Promise( async (resolve, rejects) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        }catch (e) {
            rejects(e)
        }
    })
}

let getAllUser = () => {
    return new Promise (async (resolve, rejects) => {
        try {
            let users = db.User.findAll({
                raw: true,
            })
          
            resolve(users)
        }catch(e) {
            rejects(e)
        }
    })
}


let getUserById= (userId) => {
    return new Promise (async(resolve, rejects) => {
        try {
            let user =  await db.User.findOne({ 
                where : { id:userId } ,
                raw: true 
            })
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (e) {
            rejects(e)
        }
    }) 
}

let updateUser = (data) => {
   return new Promise ( async (resolve, rejects) => {
    try {
        let user = await db.User.findOne({
            where: { id : data.id}
        })
       if(user) {
        user.fistName = data.firstName
        user.lastName = data.lastName
        user.address = data.address
        
        await user.save()

        let allUses = db.User.findAll()
        resolve(allUses)
       } else {
        resolve ()
       }
    }catch(e) {
        rejects(e)
    }
   }) 
}
const deleteUserById = async(id) => {
   return new Promise (async (resolve, rejects) => {
    try {
        let user = await db.User.findOne({
            where: {id : id}
        })
        if(user) {
            await user.destroy()
        }
        resolve();
    }catch(e) {
        rejects(e)
    }
   }) 
}


module.exports = {
    createNewUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUserById,
}