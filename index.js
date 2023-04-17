const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose')
app.use(express.urlencoded({extended : false}));

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`)
})