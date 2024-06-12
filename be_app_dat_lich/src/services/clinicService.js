const bcrypt = require("bcryptjs");
const db = require("../models/index");
const _ = require("lodash");
const { sendSimpleEmail } = require("./emailService");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { where } = require("sequelize");

require("dotenv").config();

let createNewClinicSV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
        ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          Message: "Missing parameter",
        });
      } else {
        let imageBuffer = Buffer.from(data.imageBase64.split(",")[1], "base64");
        await db.Clinic.create({
          name: data.name,
          image: imageBuffer,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          address: data.address
        });

        resolve({
          errCode: 0,
          Message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllClinicSV = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "binary").toString("base64");
          return item;
        });
        resolve({
          errCode: 0,
          Message: "ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicByIdSV = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('check gui len: ', specialtyId, location)
      if(!clinicId) {
        resolve({
          errCode: -1,
          Message: 'Missing parameter'
        })
      }else {
        let data = await db.Clinic.findOne({
          where: {
            id: clinicId
          },
          attributes: ['descriptionHTML', 'descriptionMarkdown','name', 'address', ]
        })

        if(data) {
          let doctorClinic = []
          doctorClinic = await db.Doctor_Infor.findAll({
            where: {
              clinicId: clinicId
            },
            attributes: ['doctorId','provinceId']
          })
          data.doctorClinic = doctorClinic
        }else {
          data = {}
        }
        resolve({
          Message:'ok',
          errCode: 0,
          data
        })
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteClinicSV = (id) => {
  return new Promise( async (resolve, reject) => {
      let clinic = await db.Clinic.findOne({
          where: {id : id}
      })

      if(!clinic) {
          resolve({
              errCode: 2,
              message: 'Khong tim thay phong kham'
          })
      }

      await db.Clinic.destroy({
          where: {id: id}
      })

      resolve({
          errCode: 0,
          message: 'Delete clinic success'
      })
  })
}

let handleUpdateClinicSV = (data) => {
  return new Promise( async (resolve, reject) => {
      try{
          if(!data.id || !data.imageBase64 || !data.address || !data.descriptionHTML || !data.descriptionMarkdown || !data.name) {
              resolve({
                  errCode: 2,
                  message: 'Missing parameter'
              })
          }
          let clinic = await db.Clinic.findOne({
              where: { id : data.id},
              raw: false
          })
         if(clinic) {
              let imageBuffer = Buffer.from(data.imageBase64.split(",")[1], "base64");
              clinic.name = data.name
              clinic.address  =data.address
              clinic.descriptionHTML  =data.descriptionHTML
              clinic.descriptionMarkdown = data.descriptionMarkdown
              clinic.image = imageBuffer
            await clinic.save()
          resolve({
              errCode: 0,
              message: 'update user success'
          })
         } else {
          resolve ({
              errCode: 1,
              message: 'Khong tim thay clinic'
          })
         }
      }catch (e) {
          reject(e)
      }
  })
}


module.exports = {
    createNewClinicSV,
    getAllClinicSV,
    getDetailClinicByIdSV,
    handleDeleteClinicSV,handleUpdateClinicSV
};
