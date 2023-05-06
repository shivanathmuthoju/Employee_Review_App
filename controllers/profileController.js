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
    
    let user = await req.user.populate('userData');
    await Invitation.create({
        email : req.body.email,
        companyId : (user.userType == "Employee") ? user.userData.company.id : user.userData._id,
        inviter : user.userType,
        invitationBy : user.userData._id
    })

    return res.redirect('back');
    
}