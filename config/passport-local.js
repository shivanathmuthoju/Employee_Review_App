const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

//setting passport-js

passport.use(new LocalStrategy(
    {
        usernameField : 'email'
    },
    function(email, password, done) {
        User.findOne({email : email})
        .then((user) => {
            if(!user) {
                console.log("User Not Found == passport js");
                return done(null ,false);
            }
            else if(user.password != password) {
                console.log("Invalid Username / Password");
                return done(null, false);
            }
            return done(null, user)
        })
        .catch((err) => {
            console.log("Error in finding user == passportjs");
            return done(err)
        })
    }

));

//serializing the user 

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

//deserializing the user

passport.deserializeUser(function(id, done) {
    User.findOne({_id : id})
    .catch((err) => {
        console.log("Error in finding user === passportjs");
        return done(err)
    })
    .then((user) => {
        return done(null, user)
    })
});

passport.checkAuthentication = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/signin');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user
    }

    next()
}


passport.destroySession = function(req, res, next)  {
    req.logout(function(err) {
        if(err ) {
            return next(err);
        }

        next();
    })
}

module.exports = passport;