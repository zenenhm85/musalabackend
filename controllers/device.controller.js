const { response, request } = require("express");

const Device = require("../models/peripheral-device.model");

/*==========================================================
POST
===========================================================*/
const createDevice = async (req = request, res = response) => {
  try {
    
    let gid = req.id;
    const device = new Device(req.body);

    await device.save();

    res.status(200).json({
      ok: true,
      device,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
      errors: error,
    });
  }
};

/*==========================================================
GET
===========================================================*/
const getDevices = async (req = request, res = response) => {
    try {
      const start = Number(req.query.start) || 0;
      const limit = Number(req.query.limit) || 10;
  
      const [devices, total] = await Promise.all([
        Device.find({}).skip(start).limit(limit),
        Device.countDocuments(),
      ]);
  
      return res.status(200).json({
        ok: true,
        total,
        devices,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Unexpected server error",
        errors: error,
      });
    }
  };
  const getDevicesbyGateway = async (req = request, res = response) => {
    try {
      
      const gateway = req.params.gateway;
  
      const [devices, total] = await Promise.all([
        Device.find({gateway:gateway}),
        Device.countDocuments(),
      ]);
  
      return res.status(200).json({
        ok: true,
        total,
        devices,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Unexpected server error",
        errors: error,
      });
    }
  };
  /*==================================================
PUT
====================================================*/
const updateDevice = async (req = request, res = response) => {
    const id = req.params.id;
  
    try {
     
  
      const updatedDevice = await Device.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      return res.json({
        ok: true,
        device: updatedDevice,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
        errors: error,
      });
    }
  };
  /*========================================
DELETE
========================================== */
const deleteDevice = async (req = request, res = response) => {
    const id = req.params.id;
  
    try {
      await Device.findByIdAndDelete(id);  
  
      return res.json({
        ok: true,
        message: "Device deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
        errors: error,
      });
    }
  };

module.exports = {
  createDevice,
  getDevices,
  getDevicesbyGateway,
  updateDevice,
  deleteDevice
};
