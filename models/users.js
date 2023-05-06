const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
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
            if (this.userType == "Employee") {
                return "Employee"
            }
            else if (this.userType == "Organization"){
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