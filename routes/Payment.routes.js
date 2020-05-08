var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Payment = require('./../models/PaymentModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());

router.post('/create', function(req, res) {

        let request = req.body;
        let patientData = req.body.patientData;

        Payment.create({
          Doctor_name: req.body.Doctor_name,
          Doctor_email_id: req.body.Doctor_email_id,
          Doctor_image: req.body.Doctor_image,
          Payment_id: req.body.Payment_id,
          Payment_type: req.body.Payment_type,
          payment_amount: req.body.payment_amount,
          Date_of_payments: req.body.Date_of_payments,
          Pay_by_email_id: req.body.Pay_by_email_id,
          Pay_by_name: req.body.Pay_by_name,
          Pay_by_Image: req.body.Pay_by_Image,
          Appointment_id: req.body.Appointment_id,
        }, 

       async function (err, data) {
          if (err) return res.status(500).send("There was a problem inserting the data.");
          console.log(err)
          var PaymentDetails = await Patient.findByIdAndUpdate(patientData,{Payment :user._id} ,{ upsert: true, new: true });
         
          res.success(200, "Payment details inserted successfully",data);
        });

});

router.post('/getlist/', function (req, res) {
       
        var patientid = req.body.pid;
        
        Patient.findById(patientid, function (err, Data) {
            if (err) return res.error(500 , "There was a problem finding the List.");
             res.success(200, "",Data);
        }).populate('Family');
});
router.put('/edit/:id', function (req, res) {
            
            Payment.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200, "Data Updated Successfully");
        
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Payment.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting details.");
          res.success(200, "Data Deleted Successfully");
      });
});

module.exports = router;