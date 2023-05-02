const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true
    },
    userData : {
        type : mongoose.Schema.Types.ObjectId,
        ref : function () {
            if (UserType == "Individual") {
                return "Employee"
            }
            else {
                return "Organization"
            }
        }
    }
    
},
{
    timestamps : true
});


const User = mongoose.model('User', UserSchema);

module.exports = User;