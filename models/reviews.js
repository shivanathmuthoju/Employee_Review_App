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
        required : true
    },
    rating : {
        type : Number,
        default : 0,
        required : true
    },
    feedback : {
        type : String,
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;