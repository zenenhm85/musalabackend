const mongoose = require("mongoose");

const Device = require("../models/peripheral-device.model");

const validateDeviceCountandUID = async (req, res, next) => {
    const gateway = req.body.gateway;
    const uid = req.body.uid;

    const count = await  Device.find({gateway:gateway}).countDocuments();
  
    if (count > 9) {
      return res.status(400).json({
        ok: false,
        message: "Gateway with 10 peripheral devices, impossible to add another",
      });
    }
    const countUID = await  Device.find({gateway:gateway,uid:uid}).countDocuments();
    if (countUID != 0) {
      return res.status(400).json({
        ok: false,
        message: "This Peripheral Device UID already exists on this Gateway",
      });
    }

    next();
  };

  module.exports = {
    validateDeviceCountandUID
  };
  