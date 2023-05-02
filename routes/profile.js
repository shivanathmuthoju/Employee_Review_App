const express = require("express");
const router = express.Router();

const profileController = require('../controllers/profileController');
const passport = require('../config/passport-local');


// profile 
router.get('/',
    passport.checkAuthentication,
    profileController.home
);


//signout

router.get('/signout', 
    passport.destroySession,
    profileController.signOut
);


module.exports = router;