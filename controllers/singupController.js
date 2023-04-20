const Users = require('../models/users')

module.exports.signup = (req,res) => {
    res.render('../views/signup.ejs')
}

module.exports.createUser = async (req, res) => {
    let user = await Users.find({email : req.query.email})
    
    if(user) {
        console.log("User Exists", user);
        res.redirect('/signin')
    }
    else {
        User.create({
            email : req.body.email,
            password : req.body.password,
            userType : req.query.type
        })
        res.render('welcome.ejs')
    }
}