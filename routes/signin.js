const express = require("express");
const router = express.Router();
const signInController = require('../controllers/signinController');

router.get('/', signInController.signin)

module.exports = router;