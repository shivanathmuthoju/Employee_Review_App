const express = require("express");
const router = express.Router();
const signUpController = require('../controllers/singupController');

router.get('/', signUpController.signup);
router.post('/', (req, res) => {
    console.log(req.query)
    res.send('<h1>Hey</h1>')
})
module.exports = router;