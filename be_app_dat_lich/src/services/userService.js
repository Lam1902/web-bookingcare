const bcrypt = require('bcryptjs')
const db= require('../models/index')
const { raw } = require('body-parser')
const salt = bcrypt.genSaltSync(10)


let checkEmail = (email) => {
    return new Promise( async (resolve, reject ) => {
        try {
            let user = await db.User.findOne({
                where: { email : email}
            })

            if(user) {
                resolve(true)
            }else {
                resolve(false)
            }
        }catch (e) {
            reject(e)
        }
    })
}

let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = {};
            let checkE = await checkEmail(email);

            if (checkE) {
                let userData = await db.User.findOne({
                    attributes: ['id','email', 'password', 'roleId','fistName','lastName'],
                    where: { email: email },
                    raw: true
                });

                if (userData) {
                    let check = bcrypt.compareSync(password, userData.password);
            
                    if (check) {
                        user.errCode = 0;
                        user.message = 'Success';
                        delete userData.password
                        user.userData = userData;
                    } else {
                        user.errCode = 3; // Incorrect password error code
                        user.message = 'Incorrect password';
                    }
                } else {
                    user.errCode = 2;
                    user.message = `User not found`;
                }
            } else {
                user.errCode = 1;
                user.message = `Your email doesn't exist in the system.`;
            }
            resolve(user); // Resolve with userData after processing
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUsers = (id) => {

    return new Promise( async(resolve, reject ) => {
        try {
            let users = ''
            if(id === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
                
            }

            if(id && id !== 'All') {
                users = await db.User.findOne({
                    where: {id : id}
                })
            }
            resolve(users)
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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
       
        try {
            let check = await checkEmail(data.email)
            if(check===true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used, Plz try another email'
                })
            } else {
                let hashPasswordFromBcrypt = await hasUserPassword(data.password)
                await db.User.create({
                   email: data.email,
                   password: hashPasswordFromBcrypt,
                   fistName: data.firstName,
                   lastName: data.lastName,
                   address: data.address,
                   phonenumber: data.phoneNumber,
                   gender: data.gender ,
                   roleId: data.roleId,
                   positionId:data.positionId,
                   image: data.avatar
               })
               resolve({
                errCode: 0,
                message: 'Create new user success'
               })
            }
          
        }catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise( async (resolve, reject) => {
        let user = await db.User.findOne({
            where: {id : id}
        })

        if(!user) {
            resolve({
                errCode: 2,
                message: 'Khong tim thay nguoi dung '
            })
        }

        await db.User.destroy({
            where: {id: id}
        })

        resolve({
            errCode: 0,
            message: 'Delete user success'
        })
    })
}

let updateUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try{
            if(!data.id || !data.gender || !data.roleId || !data.positionId) {
                resolve({
                    errCode: 2,
                    message: 'Chưa nhận được ID để cập nhật'
                })
            }
            let user = await db.User.findOne({
                where: { id : data.id},
                raw: false
            })
           if(user) {
       
                user.fistName = data.firstName
                user.lastName  =data.lastName
                user.address  =data.address
                user.phonenumber = data.phoneNumber
                user.gender = data.gender
                user.roleId = data.roleId
                user.positionId =data.positionId
                if(data.avatar) {
                    user.image = data.avatar
                }

              await user.save()
            resolve({
                errCode: 0,
                message: 'update user success'
            })
           } else {
            resolve ({
                errCode: 1,
                message: 'Khong tim thay user'
            })
           }
        }catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!typeInput) {
                resolve({
                    errCode: 1,
                    message:'Chưa truyền vào type'
                })
            }else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                })
                res.errCode = 0
                res.data = allcode
                resolve(res)
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllCodeService,
}