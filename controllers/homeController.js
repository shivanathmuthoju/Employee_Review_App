module.exports.home = (req, res) => {
    res.render('home.ejs', {title : "Hey"})
}

module.exports.welcome = (req, res) => {
    res.render('welcome.ejs')
}