const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');
const signInController = require('../controllers/signinController');
const signUpController = require('../controllers/singupController');
const passport = require('../config/passport-local');


router.get('/', homeController.home);
// router.get('/welcome', homeController.welcome)

//signin 

router.get('/signin', signInController.signin);
router.post('/signin', 
    passport.authenticate(
        'local',
        {failureRedirect : '/signin'}),
    signInController.login
    );

//signup

router.get('/signup', signUpController.signup);
router.post('/signup', signUpController.createUser)


module.exports = router;