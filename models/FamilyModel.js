var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var FamilySchema = new mongoose.Schema({  
  
  Name: String,

  Email_id: String,

  LastName: String,

  Suffering_for: String,

  Looking_doctor_like: String,

  Looking_doctor_specialisation: String,

  Current_location:{

   type: { type: String },
   coordinates: []
  },
  
  DOB : Date,

  Attach_documents: String,

  Attach_prescription: String,
  
  Relation :String,

  Age: Number,
  
  Gender : String,

  BloodGroup : String,
  
  ContactNumber:Number,

  Coverage: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
  Information: String,
 
});
mongoose.model('Family', FamilySchema);

module.exports = mongoose.model('Family');