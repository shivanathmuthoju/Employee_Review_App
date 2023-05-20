const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employee',
        required : true
    },
    reviewee : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employee',
        required : true
    },
    assignedBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'assigneeType'
    },
    assigneeType : {
        type : String,
        required : true,
        enum : ['Employee', 'Organization']
    },
    rating : {
        type : Number,
        default : 0,
        required : true
    },
    feedback : {
        type : String
    },
    status : {
        type : String,
        required : true,
        default : "pending",
        enum : ['pending', 'done']
    }
}, {
    timestamps : true
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;