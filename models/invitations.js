const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    comapnayId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Organization"
    },
    invitationBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : String,
        default : "pending",
        required : true
    }
});

const Invitation = mongoose.model("Invitation", invitationSchema);
