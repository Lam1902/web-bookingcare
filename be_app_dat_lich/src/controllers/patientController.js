const { postBookAppointmentSV ,postVerifyBookSV , handleSuccessAppointmentSV} = require("../services/patientService");
let postBookAppointment = async (req, res) => {
  try {
    // console.log('check data 1: ', req.body )
    let data = await postBookAppointmentSV(req.body );
    return res.status(200).json(data);
  } catch (e) {
    console.log("post error : ", e);
    return res.status(200).json({
      errCode: -1,
      message: "error from server",
    });
  }
};
let postVerifyBook = async (req, res) => {
  try {
    // console.log('check data 1: ', req.body )
    let data = await postVerifyBookSV(req.body );
    return res.status(200).json(data);
  } catch (e) {
    console.log("post error : ", e);
    return res.status(200).json({
      errCode: -1,
      message: "error from server",
    });
  }
};
let handleSuccessAppointment = async (req, res) => {
  try {
    // console.log('check data 1: ', req.body )
    let data = await handleSuccessAppointmentSV(req.query.bookId );
    return res.status(200).json(data);
  } catch (e) {
    console.log("post error : ", e);
    return res.status(200).json({
      errCode: -1,
      message: "error from server",
    });
  }
};


module.exports = {
  postBookAppointment,
  postVerifyBook,
  handleSuccessAppointment
};
