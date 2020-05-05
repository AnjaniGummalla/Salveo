var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var DoctortypeSchema = new mongoose.Schema({  
  
  Image_icon: String,

  Name_of_the_type: String,

});
mongoose.model('Doctortype', DoctortypeSchema);

module.exports = mongoose.model('Doctortype');