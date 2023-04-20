const express = require("express");
const HomeController = require("../controllers/home_controller");
const authenticateMiddleware = require("../middlewares/Authenticate")
const router = express.Router();

router.post('/', authenticateMiddleware , HomeController.get);
router.get('/:movie_id', authenticateMiddleware , HomeController.getById);

module.exports = router