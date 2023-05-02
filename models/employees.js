const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    company : {
        name : {
            dtype : String,
        },
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Organization'
        }}
    ,
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
    reviewsReceived : [
        {
            rating : {
                type : mongoose.Schema.Types.Number,
            },
            reviewId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Review'
            }
        }
    ]

},{
    timestamps : true
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;