

module.exports.signin = (req,res) => {

    if(req.isAuthenticated()) {
        return res.redirect('/profile');
    }

    return res.render('../views/signin.ejs')
}

module.exports.login = (req, res) => {
    
    

    return res.redirect('/profile')
}