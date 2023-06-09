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


//add users

router.post('/addUsers', profileController.sendInvite);

// get invitaions of the user

router.get('/getInvitations', profileController.getInvitaions);

// accept user invitation

router.post('/acceptInvitation', profileController.acceptInvite);

//reject user invitation

router.post('/rejectInvitation', profileController.rejectInvite);

// get employees of the organization

router.get('/getEmployees', profileController.getEmployees);

// assign feedbacks to employees

router.post('/assignFeedback', profileController.createFeedback);

// assigned Feedbacks

router.get('/assignedFeedbacks', profileController.getAssignedFeedbacks);

// requested Feedbacks

router.get('/getRequestedFeedbacks', profileController.getRequestedFeedbacks)

//submit Feedbacks

router.post('/submitFeedback', profileController.submitFeedback);

//received Feedbacks

router.get('/receivedFeedbacks', profileController.getReceivedFeedbacks);

module.exports = router;