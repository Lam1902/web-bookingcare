const { query } = require("express");
const {createNewClinicSV ,getAllClinicSV, getDetailClinicByIdSV ,handleDeleteClinicSV ,handleUpdateClinicSV} = require('../services/clinicService')

let createNewClinic = async (req, res) => {
    try {
    //   console.log('check data 1: ', req.body )
      let data = await createNewClinicSV(req.body );
      return res.status(200).json(data);
    } catch (e) {
      // console.log("post error : ", e);
      return res.status(200).json({
        errCode: -1,
        message: "error from server",
      }); 
    }
  };

  let getAllClinic = async (req, res) => {
    try {
      let data = await getAllClinicSV();
      return res.status(200).json(data);
    } catch (e) {
      console.log("post error : ", e);
      return res.status(200).json({
        errCode: -1,
        message: "error from server",
      }); 
    }
  };

  let getDetailClinicById = async (req, res) => {
    try {
    //   console.log('check data 1: ', req.body )
      let data = await getDetailClinicByIdSV(req.query.id);
      return res.status(200).json(data);
    } catch (e) {
      // console.log("post error : ", e);
      return res.status(200).json({
        errCode: -1,
        message: "error from server",
      }); 
    }
  };

  let handleDeleteClinic = async (req, res) => {
    try {
      //   console.log('check data 1: ', req.body )
        let data = await handleDeleteClinicSV(req.body.id);
        return res.status(200).json(data);
      } catch (e) {
        console.log("post error : ", e);
        return res.status(200).json({
          errCode: -1,
          message: "error from server",
        }); 
      }
  }

  let handleUpdateClinic = async (req, res) => {
    try {
      //   console.log('check data 1: ', req.body )
        let data = await handleUpdateClinicSV(req.body);
        return res.status(200).json(data);
      } catch (e) {
        console.log("post error : ", e);
        return res.status(200).json({
          errCode: -1,
          message: "error from server",
        }); 
      }
  }

  


  


  
module.exports = {
    createNewClinic,
    getAllClinic,
    getDetailClinicById,
    handleDeleteClinic,handleUpdateClinic
};
