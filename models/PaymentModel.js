var mongoose = require('mongoose');
const Schema = mongoose.Schema; 
var Payment_detailsSchema = new mongoose.Schema({  
  
  Doctor_name: String,

  Doctor_email_id: String,

  Doctor_image: String,

  Payment_id: String,

  Payment_type: String,

  payment_amount: String,

  Date_of_payments: String,

  Pay_by_email_id: String,

  Pay_by_name: String,

  Pay_by_Image: String,

  Appointment_id: String,

});
mongoose.model('Payment', Payment_detailsSchema);

module.exports = mongoose.model('Payment');