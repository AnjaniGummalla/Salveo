var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var UserSchema = new mongoose.Schema({  
  
  Name: String,

  Email:{

  	type: String,
  	unique: true
  },

  Password: String,
  
  Type: { type: Number,
        enum: [0, 1,2],
        default: 0}, 
  
  Phone: {

    type: String,
    unique: true
  
  },

  Logintype: { 
    type: Number,
    enum: [1,2,3],
    default: 0},

  UpdatedAt : String,

  Lastlogin : String,

  Patient : {

    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },

  Doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');