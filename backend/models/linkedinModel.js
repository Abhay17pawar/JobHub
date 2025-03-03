const mongoose = require("mongoose");

const linkedinSchema = new mongoose.Schema({
    email : {
      type : String
    },
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
        //unique : true
     },
}, {
    timestamps : true
});

const LinkedInJob = mongoose.model("LinkedInJob", linkedinSchema);

module.exports = LinkedInJob;