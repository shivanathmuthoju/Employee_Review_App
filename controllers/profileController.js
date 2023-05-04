const User = require('../models/users');
const Employee = require('../models/employees');
const Organization = require('../models/organizations');

module.exports.home = async (req, res) => {
    
    // let userData;
    if(req.user.userType === "Employee") {
        await Employee.findOne({_id : req.user.userData})
        .then((data) => {
            console.log(data)
            return res.render('profile.ejs', {Data : data});
        })
        .catch((err) => console.log("Error fetching Employee Data: ", err))
    }
    else if(req.user.userType === "Organization") {
        await Organization.findById(req.user.userData._id)
        .then((data) => {
            return res.render('profile.ejs', {Data : data});
        })
        .catch((err) => console.log("Error Fetching Organization Data: ", err))
    } 
    
}


module.exports.signOut = (req, res) => {
    return res.redirect('/');
}