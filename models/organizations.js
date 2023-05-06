const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    name : {
        type : String,
        required : true
    },
    teamSize : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    employees : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    }]
});


const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;