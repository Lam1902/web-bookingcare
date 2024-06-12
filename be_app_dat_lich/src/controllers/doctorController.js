const { getTopDoctorService , getAllDoctorService, saveInfoDoctorSv ,
   getInfoDoctorSv , bulkCreateScheduleSV , getScheduleByDateSV , getExtraInforDoctorByIdSV , getProfileDoctorByIdSV,
   getListPatientSV
  
  } = require("../services/doctorService");



const getTopDoctorController = async (req, res) => {
  let limit = parseInt(req.query.limit) ;
  if (!limit) limit = 10;
  try {
    let data = await getTopDoctorService(limit);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get top doctor error : ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Get top doctor error",
    });
  }
}

const getAllDoctorController = async (req, res) => {
  try {
    let data = await getAllDoctorService();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      message: "Get all doctor error",
    });
  }
}

const saveInfoDoctor = async (req, res) => {
  try {
    console.log('check data be: ', req.body)
    let res1 = await saveInfoDoctorSv(req.body)
    return res.status(200).json({
      errCode: 0,
      res: res1
    });
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      message: "err saveInfoDoctor",
    });
  }
}

const getInfoDoctor = async (req, res) => {
  try {
    // console.log('Request Query:', req.query);
    // console.log('check id:', req.query.id );
    
    let info = await getInfoDoctorSv(req.query.id);
    return res.status(200).json({
      errCode: 0,
      data: info,
    });
  } catch (e) {
    console.error("Error in getInfoDoctor controller:", e); // Log thông tin chi tiết về lỗi
    return res.status(500).json({
      errCode: -1,
      message: "Có lỗi xảy ra khi xử lý yêu cầu",
    });
  }
};

const bulkCreateSchedule = async (req, res) => {
  try {
    console.log(req.body)
    let info = await bulkCreateScheduleSV(req.body)
    return res.status(200).json(info);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      message: "err bulkCreateSchedule controller",
    });
  }
}

const getScheduleByDate = async (req, res) => {
  try{
    let info = await getScheduleByDateSV(req.query.doctorId, req.query.date)
    return res.status(200).json(info)
  }catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      message: "err getScheduleByDate controller",
    });
  }
}

const getExtraInforDoctorById = async (req, res) => {
  try{
   let infor = await getExtraInforDoctorByIdSV(req.query.doctorId)
   return res.status(200).json(infor)
  }catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      message: "err getExtraInforDoctorById controller",
    });
  }
}

const getProfileDoctorById = async (req, res) => {
  try{
   let infor = await getProfileDoctorByIdSV (req.query.doctorId)
   return res.status(200).json(infor)
  }catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      message: "err getProfileDoctorById controller",
    });
  }
}

const getListPatient = async (req, res) => {
  try{
    // console.log('check id: ', req.query.doctorId)
   let list = await getListPatientSV(req.query.doctorId)
   return res.status(200).json(list)
  }catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      message: "err getProfileDoctorById controller",
    });
  }
}

module.exports = {
  getTopDoctorController,
  getAllDoctorController,
  saveInfoDoctor,
  getInfoDoctor,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,getListPatient
};
