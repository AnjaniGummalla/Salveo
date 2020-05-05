var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var HomeBannerSchema = new mongoose.Schema({  
  
  Image_link: String,

  Added_by: String,

  UpdatedAt : String,
});
mongoose.model('Homebanner', HomeBannerSchema);

module.exports = mongoose.model('Homebanner');