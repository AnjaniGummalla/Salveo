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

        function (err, user) {
          if (err) return res.status(500).send({message:"There was a problem in creating payment details."});
          console.log(err)

          res.success(200, "Details Inserted successfully");
        });

});

router.get('/getlist', function (req, res) {

        Payment.find({}, function (err, Payments) {
            if (err) return res.status(500).send("There was a problem finding the Payments.");
            res.success(200, "Paymentslist", Payments);
        });
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