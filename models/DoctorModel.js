var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var DoctorSchema = new mongoose.Schema({  
  
  FirstName: String,
  
  DOB : Date,
  
  Languages:String,

  Email: String,
  
  Password : String,
  
  ContactNumber:String,

  Qualifications : String,

  HighestQualifications: String,

  Specilization: String,
  
  YearPassing: Date,
  
  Experience: Number,
  
  CurrentLocation: String,

  EmployeeAt: String,

  AvailableHours: Number,

  OnlineConsultant: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    Information: String,
 
});
mongoose.model('Doctor', DoctorSchema);

module.exports = mongoose.model('Doctor');