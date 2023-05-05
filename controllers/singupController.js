const User = require('../models/users')
// const Users = require('../models/users')
const Employee = require('../models/employees');
const Organization = require('../models/organizations');

module.exports.signup = (req,res) => {
    if(req.isAuthenticated()) {
        return res.redirect('/profile');
    } 

    return res.render('../views/signup.ejs')
}

module.exports.createUser = async (req, res) => {
    let user = await User.find({email : req.body.email})
    
    if(user.length > 0) {
        console.log("User Exists", user);
        return res.redirect('/signin');
    }
    else {
        console.log(req.query)
        if(req.query.type == "Employee") {
            console.log("Employee Function")
            let userCreated = await User.create({
                email : req.body.email,
                password : req.body.password,
                userType : req.query.type
            })
            let newEmployee = await Employee.create({
                email : req.body.email,
                userId : userCreated._id,
                name : req.body.employeeName
            })

            userCreated.userData = newEmployee._id;

            await userCreated.save();
            
            return res.render('welcome.ejs');
        }
        else if(req.query.type == "Organization") {
            console.log("Organization Function")
            let userCreated = await User.create({
                email : req.body.email,
                password : req.body.password,
                userType : req.query.type
            })
            let organizationCreated = await Organization.create({
                userId : userCreated._id,
                email : req.body.email,
                name : req.body.OrganizationName,
                teamSize : req.body.TeamSize,
                category : req.body.category
            })

            userCreated.userData = organizationCreated._id;

            await userCreated.save();
            
            return res.render('welcome.ejs');


            
             
        }
    }
}