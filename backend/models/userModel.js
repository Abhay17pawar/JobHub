const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
   email: { type: String, required: true, unique: true },
   skills: {
    front_end_development: [String],
          backend_development: [String],
          mobile_app_development: [String],
          machine_learning: [String],
          cloud_computing: [String],
          cyber_security: [String],
          blockchain_development: [String],
          computer_vision:[String],
          angular_js_development:[String],
          java : [String],
          node_js_development: [String],
          flutter_development:[String],
          game_development:[String],
          ui_ux : [String],
          data_science: [String],
          full_stack_development : [String],
          php_web_development : [String],
          python_django: [String],
          ruby_on_rails: [String], 
          ios_app_devlopment:[String],
          android_app_devlopment:[String],
         otherTech: [String],
   },
 });
 
const User = mongoose.model('User',userSchema);

module.exports = User;