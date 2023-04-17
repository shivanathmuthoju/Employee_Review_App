const express = require('express');
const app = express();
const port = 8000;
const path = require('path')
const db = require('./config/mongoose')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"))
app.use(express.urlencoded({extended : false}));
app.use(express.static('assets'));

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`)
});

app.use('/', require('./routes/index'));
app.use('/signin', require('./routes/signin'));
app.use('/signup', require('./routes/signup'));