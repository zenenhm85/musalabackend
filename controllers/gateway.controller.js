const { response, request } = require("express");

const Gateway = require("../models/gateway.model");
const Device = require("../models/peripheral-device.model");

/*==========================================================
POST
===========================================================*/
const createGateway = async (req = request, res = response) => {
  try {
    const gateway = new Gateway(req.body);

    await gateway.save();

    res.status(200).json({
      ok: true,
      gateway,
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
const getGateways = async (req = request, res = response) => {
  try {
    const start = Number(req.query.start) || 0;
    const limit = Number(req.query.limit) || 5;

    const [gateways, total] = await Promise.all([
      Gateway.find({}).skip(start).limit(limit),
      Gateway.countDocuments(),
    ]);

    return res.status(200).json({
      ok: true,
      total,
      gateways,
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
const updateGateway = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const updatedGateway = await Gateway.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      ok: true,
      gateway: updatedGateway,
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
const deleteGateway = async (req = request, res = response) => {
  const id = req.params.id;

  try {
    await Gateway.findByIdAndDelete(id);
    await Device.deleteMany({gateway:id});
    return res.json({
      ok: true,
      message: "Gateway deleted successfully",
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
  createGateway,
  getGateways,
  updateGateway,
  deleteGateway,
};
