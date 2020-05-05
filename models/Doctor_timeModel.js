var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var DoctortimeSchema = new mongoose.Schema({  
  
  Doctor_name: String,

  Doctor_email_id: String,

  Doctor_ava_Date: Date,

  Time: Date,

  Comm_type_chat: String,

  Comm_type_video: String,

});
mongoose.model('Doctortime', DoctortimeSchema);

module.exports = mongoose.model('Doctortime');