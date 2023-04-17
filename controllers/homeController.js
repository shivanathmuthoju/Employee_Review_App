module.exports.home = (req, res) => {
    res.render('../views/home.ejs', {title : "Hey"})
}