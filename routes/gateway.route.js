const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateGateWayId } = require("../middlewares/validate-exist-id");
const { validateIpv4 } = require("../middlewares/validate-ipv4");

const {
  createGateway,
  getGateways,
  updateGateway,
  deleteGateway,
} = require("../controllers/gateway.controller");

const router = Router();

router.get("/", validateJWT, getGateways);
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("serial", "Serial is required").not().isEmpty(),
    check("serial", "Serial must be 6 characters").isLength(6),
    check("ipv4", "Ipv4 is required").not().isEmpty(),
    validateFields,
    validateIpv4,
  ],
  createGateway
);
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("serial", "Serial is required").not().isEmpty(),
    check("serial", "Serial must be 6 characters").isLength(6),
    check("ipv4", "Ipv4 is required").not().isEmpty(),
    validateFields,
    validateGateWayId,
    validateIpv4,
  ],
  updateGateway
);
router.delete("/:id", [validateJWT, validateGateWayId], deleteGateway);

module.exports = router;
