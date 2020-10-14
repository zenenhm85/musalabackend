const { Router } = require('express');

const { validateJWT } = require("../middlewares/validate-jwt");
const {getUsers, getGateways} = require('../controllers/search.controller');

const router = Router();


router.get('/users/:search',validateJWT, getUsers);
router.get('/gateways/:search',validateJWT, getGateways);


module.exports = router;