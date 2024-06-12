const { query } = require("express");
const {createNewSpecialtySV,getAllSpecialtySV,getDetailSpecialtyByIdSV,handleDeleteSpecialtySV ,handleUpdateSpecialtySV} = require("../services/specialtyService");

let createNewSpecialty = async (req, res) => {
    try {
    //   console.log('check data 1: ', req.body )
      let data = await createNewSpecialtySV(req.body );
      return res.status(200).json(data);
    } catch (e) {
      // console.log("post error : ", e);
      return res.status(200).json({
        errCode: -1,
        message: "error from server",
      }); 
    }
  };

  let getAllSpecialty = async (req, res) => {
    try {
      let data = await getAllSpecialtySV();
      return res.status(200).json(data);
    } catch (e) {
      console.log("post error : ", e);
      return res.status(200).json({
        errCode: -1,
        message: "error from server",
      });
    }
  };

  let getDetailSpecialtyById = async (req, res) => {
    try {
      let data = await getDetailSpecialtyByIdSV(req.query.id, req.query.location);
      return res.status(200).json(data);
    } catch (e) {
      console.log("post error : ", e);
      return res.status(200).json({
        errCode: -1,
        message: "error from server",
      });
    }
  };


  let handleDeleteSpecialty = async (req, res) => {
    try {
      //   console.log('check data 1: ', req.body )
        let data = await handleDeleteSpecialtySV(req.body.id);
        return res.status(200).json(data);
      } catch (e) {
        console.log("post error : ", e);
        return res.status(200).json({
          errCode: -1,
          message: "error from server",
        }); 
      }
  }

  let handleUpdateSpecialty = async (req, res) => {
    try {
      //   console.log('check data 1: ', req.body )
        let data = await handleUpdateSpecialtySV(req.body);
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
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    handleDeleteSpecialty,handleUpdateSpecialty
};
