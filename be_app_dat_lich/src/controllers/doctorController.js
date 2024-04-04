const { getTopDoctorService } = require("../services/doctorService");

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


module.exports = {
  getTopDoctorController,
};
