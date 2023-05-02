const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo');
app.use(express.urlencoded({extended : false}));

app.use(cookieParser());

app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.use(session({
    name : 'Feedo',
    secret : 'IamBatman',
    saveUninitialized : false,
    resave : false,
    store : MongoStore.create(
        {
            mongoUrl : 'mongodb://127.0.0.1/employee_database',
            autoRemove : 'disabled'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`)
});

app.use('/', require('./routes/index'));
app.use('/profile', require('./routes/profile'));
// app.use('/signin', require('./routes/signin'));
// app.use('/signup', require('./routes/signup'));
