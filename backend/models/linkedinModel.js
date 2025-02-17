const mongoose = require("mongoose");

const linkedinSchema = new mongoose.Schema({
     title : {
        type : String,
     },
     company : {
        type : String,
     },
     location : {
        type : String,
     },
     link : {
        type : String,
     },
}, {
    timestamps : true
});

const LinkedInJob = mongoose.model("LinkedInJob", linkedinSchema);

module.exports = LinkedInJob;