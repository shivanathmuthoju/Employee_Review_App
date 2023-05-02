module.exports.home = (req, res) => {

    if(req.isAuthenticated()) {
        return res.redirect('/profile');
    }

    return res.render('home.ejs', {title : "Hey"})
}

module.exports.welcome = (req, res) => {
    return res.render('welcome.ejs')
}