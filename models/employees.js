const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    company : {
            
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Organization',
        required : false
        
    },
    position : {
        type : String
    },
    isAdmin : {
        type : mongoose.Schema.Types.Boolean,
        default : false,
        required : true
    },
    reviewsRequested : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }],
    ratings : [ { type : mongoose.Schema.Types.Number }]

},{
    timestamps : true
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;