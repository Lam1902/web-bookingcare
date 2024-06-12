const bcrypt = require("bcryptjs");
const db = require("../models/index");
const _ = require("lodash");
const { sendSimpleEmail } = require("./emailService");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { where } = require("sequelize");

require("dotenv").config();

let createNewSpecialtySV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          Message: "Missing parameter",
        });
      } else {
        let imageBuffer = Buffer.from(data.imageBase64.split(",")[1], "base64");
        await db.Specialty.create({
          name: data.name,
          image: imageBuffer,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
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

let getAllSpecialtySV = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
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
let getDetailSpecialtyByIdSV = (specialtyId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('check gui len: ', specialtyId, location)
      if(!specialtyId || !location) {
        resolve({
          errCode: -1,
          Message: 'Missing parameter'
        })
      }else {
        let data = await db.Specialty.findOne({
          where: {
            id: specialtyId
          },
          attributes: ['descriptionHTML', 'descriptionMarkdown']
        })
        if(data) {
          let doctorSpecialty = []
          if(location === 'ALL') {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {specialtyId: specialtyId},
              attributes: ['doctorId', 'provinceId']
            })
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: specialtyId,
                provinceId: location
              },
              attributes: ['doctorId','provinceId']
            })
          }

          data.doctorSpecialty = doctorSpecialty
          // console.log('check data: ', data)
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

let handleDeleteSpecialtySV = (id) => {
  return new Promise( async (resolve, reject) => {
      let specialty = await db.Specialty.findOne({
          where: {id : id}
      })

      if(!specialty) {
          resolve({
              errCode: 2,
              message: 'Khong tim thay phong kham'
          })
      }

      await db.Specialty.destroy({
          where: {id: id}
      })

      resolve({
          errCode: 0,
          message: 'Delete clinic success'
      })
  })
}

let handleUpdateSpecialtySV = (data) => {
  return new Promise( async (resolve, reject) => {
      try{
          if(!data.id || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.name) {
              resolve({
                  errCode: 2,
                  message: 'Missing parameter'
              })
          }
          let specialty = await db.Specialty.findOne({
              where: { id : data.id},
              raw: false
          })
         if(specialty) {
              let imageBuffer = Buffer.from(data.imageBase64.split(",")[1], "base64");
              specialty.name = data.name
              specialty.descriptionHTML  =data.descriptionHTML
              specialty.descriptionMarkdown = data.descriptionMarkdown
              specialty.image = imageBuffer
            await specialty.save()
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
  createNewSpecialtySV,
  getAllSpecialtySV,
  getDetailSpecialtyByIdSV,handleDeleteSpecialtySV,handleUpdateSpecialtySV
};
