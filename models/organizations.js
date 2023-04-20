const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    }
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
    roles : [{type : String}],
    employees : [{type : mongoose.Schema.Types.ObjectId}, ref : "Employee"],
    employeesPending : [{type : mongoose.Schema.Types.ObjectId}, ref : "Employee"]
}, {
    timestamps : true
});


const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;