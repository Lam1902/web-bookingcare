const bcrypt = require('bcryptjs')
const db= require('../models/index')
const { raw } = require('body-parser')
const salt = bcrypt.genSaltSync(10)

let getTopDoctorService = (limitInput) => {

    return new Promise( async (resolve, reject ) => {
        try {
           let topDoctorArr = await db.User.findAll({
            limit: limitInput,
            order: [['createdAt','DESC']],
            attributes: {
                exclude: ['password']
            },
            raw: true,
            nest: true,
            include: [
                {model: db.Allcode, as: 'positionData', attributes: ['valueVi','valueEn']},
                {model: db.Allcode, as: 'genderData', attributes: ['valueVi','valueEn']}
            ],
           })
           resolve({
            limit:limitInput,
            errCode: 0 ,
            data: topDoctorArr,
           })
        }catch (e) {
            reject(e)
        }
     })
}

module.exports = {
    getTopDoctorService
}