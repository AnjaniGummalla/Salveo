var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var PatientSchema = new mongoose.Schema({  
  
  Name: String,
  
  LastName : String,
  
  Email:{

  	type: String,
  	unique: true
  },

  Age: Number,

  Gender : String,

  Password: String,
  
  Address: String,
  
  Phone: String,

  CustomerCode: String,

  AvailableBalance: Number,

  PrepaidAmount: Number,

  Invoice: String,

  Height : String,

  Weight : String,

  Suffering_for: String,

  Looking_doctor_like: String,

  Looking_doctor_specialisation: String,

  Current_location:{

   type: { type: String },
   coordinates: []
  },

  // Family:{  

  //      type: Schema.Types.ObjectId,
  //      ref: 'Family',
     
  //     },

  Company: String,

  Documents: String,
  
  Attach_prescription: String,

  About_me: String,

  Update_date: String,

  last_login_time: String,

  login_type: String
 
});
mongoose.model('Patient', PatientSchema);

module.exports = mongoose.model('Patient');