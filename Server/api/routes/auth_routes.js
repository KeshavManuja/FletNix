const express = require("express");
const router = express.Router()
const LoginController = require("../controllers/login_controller");
const SignupController = require("../controllers/signup_controller");
const authValidator = require("../validations/auth_validator");
const validatorResponse = require("../../validatior");
router.post('/login', [validatorResponse(authValidator.login)]  ,LoginController.login);
router.post('/signup',[validatorResponse(authValidator.signup)] , SignupController.signup);
module.exports = router