const User = require('../models/users');
const Employee = require('../models/employees');
const Organization = require('../models/organizations');
const Invitation = require('../models/invitations');
const Review = require('../models/reviews');

module.exports.home = async (req, res) => {
    
    let user = await req.user.populate('userData');
    return res.render('profile.ejs', {user : user})
    
}

module.exports.signOut = (req, res) => {
    return res.redirect('/');
}

// creating and sending invites
module.exports.sendInvite = async (req, res) => {
   
    let user = await req.user.populate('userData');
    await Invitation.create({
        email : req.body.email,
        company : (user.userType == "Employee") ? user.userData.company : user.userData._id,
        position : req.body.position,
        isAdmin : (req.body.isAdmin == "on") ? true : false,
        inviter : user.userType,
        invitationBy : user.userData._id
    })

    return res.redirect('back');
    
}


// fetch invitations of the user

module.exports.getInvitaions = async (req, res) => {
    let user = await req.user.populate('userData')
    
    if(user.userType === "Organization" || (user.userType === "Employee" && user.userData.isAdmin)) {

        let invites = await Invitation.find({invitationBy : user.userData._id}).populate('company').populate('invitationBy');
     
        return res.status(200).json(invites)
    }
    else if(user.userType === "Employee" && user.userData.company === undefined) {
        let invites = await Invitation.find({email : user.email, status : "pending"}).populate('company').populate('invitationBy');
        return res.status(200).json(invites)
    }

}

// accept invitation

module.exports.acceptInvite = async (req, res) => {

    let user = await req.user.populate('userData');
    let invite = await Invitation.findById(req.query.invite).populate('company')
    let employee = await Employee.findById(user.userData._id)
    let organization = await Organization.findById(invite.company)
    
    employee.company = invite.company._id;
    employee.position = invite.position;
    employee.isAdmin = invite.isAdmin;
    await employee.save();

    invite.status = "accepted";

    await invite.save();

    organization.employees.push(employee._id)

    await organization.save();

   
    return res.redirect('/')
    

}

// reject invitation

module.exports.rejectInvite = async (req, res) => {

    let invite = await Invitation.findById(req.query.invite);

    invite.status = "rejected";

    await invite.save();

    return res.redirect('back');

}

// get all the employees
module.exports.getEmployees = async (req, res) => {
    
    let user = await req.user.populate('userData');
  
    if(user.userType === "Employee") {

        let organization = await Organization.findById(user.userData.company).populate('employees');
        let AllUsers = await organization.employees;
        let employees = await AllUsers.filter((emp) => String(emp._id) != String(user.userData._id));

        return res.status(200).json(employees);
        

    }
    else if(user.userType === "Organization") {

        let organization = await Organization.findById(user.userData._id).populate('employees');
        let employees = organization.employees;
        return res.status(200).json(employees);

    }


}

// create feedback

module.exports.createFeedback = async(req, res) => {

    let user = await req.user.populate('userData');

    if(req.body.feedbackFor === req.body.assignedTo) {

        console.log("Both fields cannot be same");
        return res.redirect('back');

    }

    let findReview = await Review.find(
        {$and : [
            {status : 'pending'},
            {reviewer : req.body.assignedTo},
            {reviewee : req.body.feedbackFor},
            {assignedBy : user.userData._id}
        ]
        }   
    )

    if(findReview.length > 0) {
        console.log("A feedback is already assigned");
        return res.redirect('back');
    }
    else {
        let createdReview = await Review.create({
            reviewer : req.body.assignedTo,
            reviewee : req.body.feedbackFor,
            assignedBy : req.user.userData._id,
            assigneeType : req.user.userType,
        })

        console.log("Feedback assigned");
        

        let Reviewer = await Employee.findById(req.body.assignedTo);
        await Reviewer.reviewsRequested.push(createdReview._id)
        await Reviewer.save();
    }

    return res.redirect('back');


}


// get assigned feedbacks

module.exports.getAssignedFeedbacks = async(req, res) => {

    let user = await req.user.populate('userData');

    let feedbacks = await Review.find(
            {assignedBy : user.userData._id}
        
    ).populate('reviewer').populate('reviewee');

    return res.status(200).json(feedbacks)

};


// get all the requested feedbacks

module.exports.getRequestedFeedbacks = async (req, res) => {

    let user = await req.user.populate('userData');
    let feedbacks = await Review.findOne({
        $and : [
            {reviewer : user.userData._id},
            {status : "pending"}
        ]
    }).populate('reviewer').populate('reviewee').populate("assignedBy");

    return res.status(200).json(feedbacks)

}


//submit Feedbacks

module.exports.submitFeedback = async(req, res) => {
    
    let review = await Review.findById(req.query.id);
    review.rating = req.body.feedbackRating;
    review.feedback = req.body.feedbackDescription;
    review.status = "done";

    await review.save();
    let reviewee = await Employee.findById(review.reviewee);

    await reviewee.ratings.push(review.rating);
    await reviewee.save();

    return res.redirect('back');
};

// gets received feedbacks
module.exports.getReceivedFeedbacks = async(req, res) => {
    let user = await req.user.populate('userData');
    
    let reviews = await Review.find({
        $and : [
            {reviewee : user.userData._id},
            {status : "done"}
        ]
    }).populate('reviewee').populate('reviewer').populate('assignedBy')

    return res.status(200).json(reviews);

}