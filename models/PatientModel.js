var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var PatientSchema = new mongoose.Schema({  
  
  FirstName: String,
  
  LastName : String,
  
  Email:{

  	type: String,
  	unique: true
  },
  Age:{
    type: String,
  },
  Gender : String,

  Password: String,
  
  Address: String,
  
  Phone: String,

  CustomerCode: String,
 
});
mongoose.model('Patient', PatientSchema);

module.exports = mongoose.model('Patient');