var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const shortid = require('shortid');
var CompanySchema = new mongoose.Schema({  

  CompanyName: String,

  Corporatecode:{
    type: String,
    //Default:shortid.generate(),
  },
  Employees : Number,

  Location : String,

  Coverage:{
    type:Number,
    enum :[0,1],
    Default: 0
  },
  ConsultantDoctors: {
    type:Number,
    enum :[0,1],
    Default: 0
  },
Balance: String,
Prepaidamount:String,
AmountUsed : String,
});
mongoose.model('Company', CompanySchema);

module.exports = mongoose.model('Company');