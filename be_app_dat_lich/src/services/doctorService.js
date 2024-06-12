const bcrypt = require("bcryptjs");
const db = require("../models/index");
const { raw } = require("body-parser");
const { where } = require("sequelize");
const salt = bcrypt.genSaltSync(10);
const _ = require("lodash");
const moment = require("moment");

require("dotenv").config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let topDoctorArr = await db.User.findAll({
        where: { roleId: 'R2' },
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["password"] },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueVi", "valueEn"],
          },
        ],
      });
      resolve({
        limit: limitInput,
        errCode: 0,
        data: topDoctorArr,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listDoctor = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: listDoctor,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let saveInfoDoctorSv = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('data: ', data)
      let checkObj = checkRequiredFields(data)
      console.log('check valid: ', checkObj)
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          message: `Missing parameter: ", ${checkObj.element}`
        });
      } else {
        if (data.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: data.contentHtml,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          });
          resolve({
            errCode: 0,
            message: "Tạo mới thành công thông tin bác sĩ",
          });
        } else if (data.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = data.contentHtml;
            doctorMarkdown.contentMarkdown = data.contentMarkdown;
            doctorMarkdown.description = data.description;
            doctorMarkdown.updateAt = new Date();
            await doctorMarkdown.save();
          }
        }

        try {
          // Tìm kiếm thông tin bác sĩ dựa trên doctorId
          let doctorInfo = await db.Doctor_Infor.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
        
          if (doctorInfo) {
            // Nếu thông tin bác sĩ tồn tại, thực hiện cập nhật
            const updatedDoctorInfor = await db.Doctor_Infor.update({
              priceId: data.selectedPrice,
              provinceId: data.selectedProvince,
              paymentId: data.selectedPayment,
              note: data.note,
              clinicId: data.clinicId,
              specialtyId: data.specialtyId
            }, {
              where: {
                doctorId: data.doctorId
              }
            });
        
            resolve({
              errCode: 0,
              message: "Cập nhật thông tin bác sĩ thành công",
            });
          } else {
            // Nếu không tìm thấy thông tin bác sĩ, tạo mới
            await db.Doctor_Infor.create({
              doctorId: data.doctorId,
              priceId: data.selectedPrice,
              provinceId: data.selectedProvince,
              paymentId: data.selectedPayment,
              note: data.note,
              clinicId: data.clinicId,
              specialtyId: data.specialtyId
            });
        
            resolve({
              errCode: 0,
              message: "Tạo mới thông tin bác sĩ thành công",
            });
          }
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi cập nhật hoặc tạo mới thông tin bác sĩ:", error);
          reject({
            errCode: 500,
            message: "Đã xảy ra lỗi khi cập nhật hoặc tạo mới thông tin bác sĩ. Vui lòng thử lại sau.",
            error: error,
          });
        }
        

      }
          
    } catch (e) {
      reject(e);
    }
  });
};
const getInfoDoctorSv = async (inputId) => {
  try {
    if (!inputId) {
      return {
        errCode: 1,
        message: "No ID provided",
      };
    }
    const doctorInfo = await db.User.findOne({
      where: { id: inputId },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: db.Markdown,
          attributes: ["description", "contentHTML", "contentMarkdown"],
        },
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueVi", "valueEn"],
        },
        {
          model: db.Doctor_Infor,
          attributes: { exclude: ["id", "doctorId"] },
          include: [
            { model: db.Allcode, as: "priceTypeData", attributes: ["valueVi", "valueEn"] },
            { model: db.Allcode, as: "provinceTypeData", attributes: ["valueVi", "valueEn"] },
            { model: db.Allcode, as: "paymentTypeData", attributes: ["valueVi", "valueEn"] },
          ],
        },
      ],
      raw: false,
      nest: true,
    });

    if (!doctorInfo) {
      return {
        errCode: 2,
        message: `Doctor not found with ID: ${inputId}`,
      };
    }

    // Handle image conversion if needed
    if (doctorInfo.image) {
      doctorInfo.image = Buffer.from(doctorInfo.image, "base64").toString("binary");
    }

    return {
      errCode: 0,
      message: "Doctor information retrieved successfully",
      data: doctorInfo,
    };
  } catch (error) {
    // Log the error for debugging
    console.error("Error in getInfoDoctorSv:", error);
    // Return a generic error message
    return {
      errCode: -1,
      message: "An error occurred while fetching doctor information",
    };
  }
};
let bulkCreateScheduleSV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formattedDate) {
        resolve({
          errCode: 1,
          message: "chua nhan dc data schedule truyen len",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = 10;
            return item;
          });
        }
        console.log("check data cbi luu: ", schedule);

        // Tìm các lịch trình hiện có
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formattedDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        console.log("Kiểm tra dữ liệu hiện có: ", existing);

        // Chuyển đổi ngày của các lịch trình hiện có thành dấu thời gian (nếu cần thiết)
        // if (existing && existing.length > 0) {
        //     existing = existing.map(item => ({
        //         ...item,
        //         date: moment(item.date).valueOf() // Giả sử 'date' là một chuỗi
        //     }));
        // }

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        console.log("Kiểm tra danh sách cần tạo: ", toCreate);

        // Tạo các lịch trình mới (nếu có)
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          message: "Luu thanh cong lich kham benh",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getScheduleByDateSV = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          message: "Chua co id hoac date truyen len",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];

        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getExtraInforDoctorByIdSV  = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          message: "Chua co id hoac date truyen len",
        });
      } else {
        let data = await db.Doctor_Infor.findOne({
          where: {
            doctorId: doctorId,
          },
          attributes: {
            exclude: ['id', 'doctorId']
          },
          include: [
            { model: db.Allcode, as: "priceTypeData", attributes: ["valueVi", "valueEn"] },
            { model: db.Allcode, as: "provinceTypeData", attributes: ["valueVi", "valueEn"] },
            { model: db.Allcode, as: "paymentTypeData", attributes: ["valueVi", "valueEn"] },
          ],
          raw: false,
          nest: true,
        });
        if (!data) data = [];

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getProfileDoctorByIdSV  = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          message: "Chua co id hoac date truyen len",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: doctorId
          },
          attributes: {
            exclude: ['password']
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Doctor_Infor,
              attributes: { exclude: ["id", "doctorId"] },
              include: [
                { model: db.Allcode, as: "priceTypeData", attributes: ["valueVi", "valueEn"] },
                { model: db.Allcode, as: "provinceTypeData", attributes: ["valueVi", "valueEn"] },
                { model: db.Allcode, as: "paymentTypeData", attributes: ["valueVi", "valueEn"] },
              ],
            },
          ],
          raw: false,
          nest: true
        })

        if(data && data.image ) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }

        if(!data) data ={} 
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkRequiredFields = (data) => {
  let arrFields = ['doctorId', 'contentHtml', 'contentMarkdown', 
    'action', 'selectedPrice', 'selectedPayment', 'selectedProvince', 
    'clinicId', 'note', 'specialtyId'];

  let isValid = true;
  let element = '';

  for (let i = 0; i < arrFields.length; i++) {
    if (!data[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }

  return {
    isValid: isValid,
    element: element
  };
};

let getListPatientSV = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
     if(!doctorId) {
      resolve({
        errCode:1,
        message: 'Missing parameter'
      })
     }else {
      let data = await db.Booking.findAll({
        where: {
          statusId: ['S2', 'S3'],
          doctorId: doctorId,
        },
        include: [
          {
            model:db.User, as:'patientData',
            attributes:['email', 'fistName', 'address','gender'],
            include: [
              {
                model: db.Allcode, as: 'genderData', attributes:['valueEn','valueVi']
              }
            ]
          },
          {
            model: db.Allcode, as:'timeTypeDataPatient', 
            attributes:['valueVi','valueEn']
          }
        ],
        raw: false,
        nest: true
      })

      resolve({
        errCode: 0,
        data: data
      })
     }
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  getTopDoctorService,
  getAllDoctorService,
  saveInfoDoctorSv,
  getInfoDoctorSv,
  bulkCreateScheduleSV,
  getScheduleByDateSV,
  getExtraInforDoctorByIdSV,
  getProfileDoctorByIdSV,
  getListPatientSV
};
