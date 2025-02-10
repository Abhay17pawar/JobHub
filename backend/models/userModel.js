const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email : {
       type : String,
       required : true,
       unique : true
    },
     skills : {
        type : [String],
        default : []
     }
})
   
const dashboard = mongoose.model('User',UserSchema);

module.exports = dashboard;