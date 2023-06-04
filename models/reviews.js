const mongoose = require('mongoose');
const { schema } = require('./users');

const reviewSchema = new mongoose.Schema({
    reviewer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employee',
        required : true,
        autopopulate : true
    },
    reviewee : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employee',
        required : true,
        autopopulate : true
    },
    assignedBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'assigneeType',
        autopopulate : true
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

schema.plugin(require('mongoose-autopopulate'));

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;