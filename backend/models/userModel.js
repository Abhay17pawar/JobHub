const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email : {
       type : String,
       unique : true
    },
     skills : {
        type : [String],
        default : []
     }
})
   
const User = mongoose.model('User',UserSchema);

module.exports = User;