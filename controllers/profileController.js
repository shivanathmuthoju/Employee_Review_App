module.exports.home = (req, res) => {
    return res.render('profile.ejs');

}


module.exports.signOut = (req, res) => {
    return res.redirect('/');
}