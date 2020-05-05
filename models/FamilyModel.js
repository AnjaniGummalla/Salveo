var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var FamilySchema = new mongoose.Schema({  
  
  Name: String,
  
  DOB : Date,
  
  Relation :String,

  Age: Number,
  
  Gender : String,

  BloodGroup : String,
  
  ContactNumber:String,

  Coverage: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
  Information: String,
 
});
mongoose.model('Family', FamilySchema);

module.exports = mongoose.model('Family');