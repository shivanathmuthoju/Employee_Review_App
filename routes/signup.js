const express = require("express");
const router = express.Router();
const signUpController = require('../controllers/singupController');

router.get('/', signUpController.signup);

module.exports = router;