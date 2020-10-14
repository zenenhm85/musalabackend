const mongoose = require("mongoose");

const User = require("../models/users.model");
const GateWay = require("../models/gateway.model");
const Device = require("../models/peripheral-device.model");
const validateUserId = async (req, res, next) => {
  const valid = await validateId(req, "user");

  if (!valid) {
    return res.status(400).json({
      ok: false,
      message: "This id does not exist",
    });
  }
  next();
};
const validateGateWayId = async (req, res, next) => {
  const valid = await validateId(req, "gateway");

  if (!valid) {
    return res.status(400).json({
      ok: false,
      message: "This id of gateway does not exist",
    });
  }
  next();
};
const validateDeviceId = async (req, res, next) => {
  const valid = await validateId(req, "device");

  if (!valid) {
    return res.status(400).json({
      ok: false,
      message: "This id of device does not exist",
    });
  }
  next();
};
const validateDeviceGateway = async (req, res, next) => {
  const id = req.body.gateway;

  const gatewayDB = await GateWay.findById(id);
  if (!gatewayDB) {
    return res.status(400).json({
      ok: false,
      message: "This id of gateway does not exist",
    });
  }
  next();
};
const validateId = async (req, type) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  switch (type) {
    case "user": {
      const userDB = await User.findById(id);
      if (!userDB) return false;
      break;
    }
    case "gateway": {
      const gatewayDB = await GateWay.findById(id);
      if (!gatewayDB) return false;
      break;
    }
    case "device": {
      const device = await Device.findById(id);
      if (!device) return false;
      break;
    }
  }
  return true;
};

module.exports = {
  validateUserId,
  validateGateWayId,
  validateDeviceId,
  validateDeviceGateway

};
