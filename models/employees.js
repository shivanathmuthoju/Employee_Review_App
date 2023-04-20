const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    employeeID : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    company : {
        [
            id : {
                type : mongoose.Schema.Types.Array,
                ref : 'Organization'
            },
            Joined : {
                type : mongoose.Schema.Types.Boolean
            }

        ]
    },
    feedbacksReceived : {
        type : mongoose.Schema.Types.Array
    },
    feedbacksRequested : {
        type : mongoose.Schema.Types.Array
    }
    
}, {
    timestamps : true
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;