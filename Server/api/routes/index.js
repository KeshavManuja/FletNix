const express = require("express");
const router = express.Router();
const authRoutes = require("./auth_routes")

router.use('/', require("./auth_routes"));
router.use('/home', require("./home_route"))

module.exports = router