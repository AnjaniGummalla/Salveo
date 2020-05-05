var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var UserSchema = new mongoose.Schema({  
  
  Name: String,

  Email:{

  	type: String,
  	unique: true
  },

  Password: String,
  
  Type: Number,
  
  Phone: String,

  Logintype: String,

  UpdatedAt : String,

  Lastlogin : String,
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');