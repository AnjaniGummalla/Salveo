var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var DoctorSchema = new mongoose.Schema({  
  
  Name: String,
  
  DOB : Date,
  
  Languages: Array,

  Email: String,
  
  Password : String,
  
  Phone:String,

  Qualifications : String,

  HighestQualifications: String,

  Specilization: String,
  
  Year_of_Passout: Date,
  
  Experience: Number,
  
  Current_location:{
   type: { type: String },
   coordinates: []
  },

  EmployeeAt: String,

  Current_employee_id: String,

  AvailableHours: Number,

  OnlineConsultant: {

        type: Number,
        enum: [0, 1],
        default: 0,
    }
    ,
    Information: String,

    login_type: String,

    Updated_At: String,

    last_login_time : String,

    Available_type : String,

    Service: Array,

    Special_mention: String,

    Charge_Per_15min: String,
    
});
mongoose.model('Doctor', DoctorSchema);

module.exports = mongoose.model('Doctor');