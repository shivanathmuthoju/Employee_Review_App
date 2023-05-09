const User = require('../models/users');
const Employee = require('../models/employees');
const Organization = require('../models/organizations');
const Invitation = require('../models/invitations');

module.exports.home = async (req, res) => {
    
    let user = await req.user.populate('userData');
    // console.log(user)
    let invitaions = await Invitation.find({email : req.user.email})
    return res.render('profile.ejs', {user : user})
    
}

module.exports.signOut = (req, res) => {
    return res.redirect('/');
}

// creating and sending invites
module.exports.sendInvite = async (req, res) => {
    console.log(req.body)
    let user = await req.user.populate('userData');
    await Invitation.create({
        email : req.body.email,
        company : (user.userType == "Employee") ? user.userData.company.id : user.userData._id,
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
        console.log(invites)
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
        let users = organization.employees;
        
        return res.status(200).json(users);
        

    }
    else if(user.userType === "Organization") {

        let organization = await Organization.findById(user.userData._id).populate('employees');
        let employees = organization.employees;

        return res.status(200).json(employees);

    }


}