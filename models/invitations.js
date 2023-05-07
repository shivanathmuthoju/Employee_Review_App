const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Organization",
        required : true
    },
    inviter : {
        type : String,
        required : true
    },
    invitationBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : function () {
            if (this.inviter == "Employee") {
                return "Employee"
            }
            else {
                return "Organization"
            }
        },
        required : true
    },
    status : {
        type : String,
        default : "pending",
        required : true
    }
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;
