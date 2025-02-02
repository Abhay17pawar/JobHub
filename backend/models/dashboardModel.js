const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    }
},
{
    timestamps : true
});

const dashboard = mongoose.model('Dashboard',dashboardSchema);

module.exports = dashboard;