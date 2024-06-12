const bcrypt = require("bcryptjs");
const db = require("../models/index");
const _ = require("lodash");
const { sendSimpleEmail } = require("./emailService");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const booking = require("../models/booking");

require("dotenv").config();

let postBookAppointmentSV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check data: ", data);
      if (!data.date || !data.timeType || !data.doctorId || 
        !data.email ||!data.fullName ||!data.selectedGender 
        ||!data.address ||!data.birthday || !data.phoneNumber
      ) {
        resolve({
          errCode: 1,
          Message: "Missing parameter",
        });
      } else {
        let token = uuidv4();

        const timeTypeMapping = {
          T1: "08:00 - 09:00",
          T2: "09:00 - 10:00",
          T3: "10:00 - 11:00",
          T4: "13:00 - 14:00",
          T5: "14:00 - 15:00",
          T6: "15:00 - 16:00",
          T7: "16:00 - 17:00",
          T8: "17:00 - 18:00",
          T9: "18:00 - 19:00",
          T10: "19:00 - 20:00",
          T11: "20:00 - 21:00",
        };

        let formattedDate = moment(data.date).format("DD/MM/YYYY");
        let timeString = timeTypeMapping[data.timeType] || "Unknown time";
        let time = "Ngày: " + formattedDate + " | Giờ : " + timeString;
        // console.log('date: ', )

        await sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: time,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: builtUrlEmail(data.doctorId, token),
          addressClinic: data.address,
          // nameClinic: data.nameClinic,
          date: formattedDate,
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            fistName: data.fullName,
            address: data.address,
            gender: data.selectedGender,
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              birthday: data.birthday,
              timeType: data.timeType,
              token: token,
              address: data.address,
              nameClinic: data.nameClinic,
              phoneNumber: data.phoneNumber,
            },
          });
        }

        resolve({
          errCode: 0,
          Message: "Save infor appointment success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let builtUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postVerifyBookSV = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('check data: ',data)
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          Message: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            Message: "Save infor appointment success",
          });
        } else {
          resolve({
            errCode: 2,
            Message: "Không tìm thấy appointment",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuccessAppointmentSV = (bookId) => {
  return new Promise( async (resolve, reject) => {
      try{
          if(!bookId) {
              resolve({
                  errCode: 2,
                  message: 'Chưa nhận được ID để cập nhật'
              })
          }
          let booking = await db.Booking.findOne({
              where: { id : bookId},
              raw: false
          })
         if(booking) {
     
             booking.statusId = 'S3'
            await booking.save()
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



module.exports = {
  postBookAppointmentSV,
  postVerifyBookSV,
  handleSuccessAppointmentSV
};
