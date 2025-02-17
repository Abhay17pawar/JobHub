const mongoose = require("mongoose");

const internshalaSchema = new mongoose.Schema({
     title : {
        type : String,
        required : true
     },
     company : {
        type : String,
        required : true
     },
     salary : {
        type : String,
        required : true 
     },
     location : {
        type : String,
        required : true
     },
     type : {
        type : String,
        required : true
     },
     platform : {
        type : String,
        required : true
     },
     jobLink : {
        type : String,
        required : true
     },
     logo : {
        type : String,
        required : true
     }
}, {
    timestamps : true
});

const InternshalaJob = mongoose.model("InternshalaJob", internshalaSchema);

module.exports = InternshalaJob;