const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {  
  validateDeviceId,
  validateDeviceGateway,
} = require("../middlewares/validate-exist-id");
const {
  validateDeviceCountandUID,
} = require("../middlewares/device-10-gateway");
const {
  createDevice,
  getDevices,
  getDevicesbyGateway,
  updateDevice,
  deleteDevice
} = require("../controllers/device.controller");

const router = Router();

router.get("/", validateJWT, getDevices);
router.get("/:gateway", validateJWT, getDevicesbyGateway);
router.post(
  "/",
  [
    validateJWT,
    check("uid", "UID is required").not().isEmpty().isNumeric(),
    check("vendor", "Vendor is required").not().isEmpty(),
    check("date", "It must be a valid date").not().isEmpty().isDate(),
    check("gateway", "Gateway ID is required and valid")
      .not()
      .isEmpty()
      .isMongoId(),
    validateFields,
    validateDeviceGateway,
    validateDeviceCountandUID,
  ],
  createDevice
);
router.put(
  "/:id",
  [
    validateJWT,
    check("uid", "UID is required").not().isEmpty().isNumeric(),
    check("vendor", "Vendor is required").not().isEmpty(),
    check("date", "It must be a valid date").not().isEmpty().isDate(),
    check("gateway", "Gateway ID is required and valid")
      .not()
      .isEmpty()
      .isMongoId(),
    validateFields,
    validateDeviceId,
    validateDeviceGateway,
    validateDeviceCountandUID,
  ],
  updateDevice
);
router.delete("/:id", [validateJWT, validateDeviceId], deleteDevice);

module.exports = router;
