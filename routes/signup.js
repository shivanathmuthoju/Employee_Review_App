const express = require("express");
const router = express.Router();
const signUpController = require('../controllers/singupController');
const User = require("../models/users");


router.get('/', signUpController.signup);
router.post('/', signUpController.createUser)
module.exports = router;