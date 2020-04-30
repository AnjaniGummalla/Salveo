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

  AvailableBalance: Number,

  PrepaidAmount: Number,

  Invoice: String,

  Family:{  

       type: Schema.Types.ObjectId,
       ref: 'Family',
     
      },

  Company: String,

  Documents: String,

 
});
mongoose.model('Patient', PatientSchema);

module.exports = mongoose.model('Patient');