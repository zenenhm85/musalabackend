
const GateWay = require("../models/gateway.model");
const validateIpv4 = (req, res, next) => {

 const { ipv4 } = req.body;

 const ipv4format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (!ipv4.match(ipv4format))
  {
    return res.status(404).json({
        ok: false,
        message: "Invalid ipv4",
      });
  } 

  next();   
};

module.exports = {
 validateIpv4,
};
