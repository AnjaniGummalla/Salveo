var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());
/**
 * Configure JWT
 */
//var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var config = require('../config'); // get config file

router.post('/Signup', function(req, res) {

        Patient.create({
          FirstName : req.body.Name,
          Email : req.body.Email,
          LastName : req.body.LastName,
          Address:req.body.Address,
          Phone : req.body.Phone,
          Gender : req.body.Gender,
          Age : req.body.Age,
          Password:req.body.password,
          CustomerCode:req.body.CustomerCode,
        }, 

        function (err, user) {
          if (err) return res.status(500).send("There was a problem registering.");
          console.log(err)

          res.success(200, "Details Inserted successfully");
        });

});
router.post('/login',  async function(req, res) {

      try{

        var patientDetails = await Patient.findOne({Email:req.body.Email});

        var DoctorsDetails  = await Doctor.findOne({Email:req.body.Email});
       
        if( patientDetails == null && DoctorsDetails == null){

        res.error(404, "Email not found");

        }

        var Patientpassword = await Patient.find({Email:req.body.Email,Password:req.body.Password});

        var Doctorpassword = await Doctor.find({Email:req.body.Email,Password:req.body.Password});

        
        if (!Patientpassword || ! Doctorpassword ) return res.error(401,"Incorrect password");
        if(Patientpassword == null){
          res.success(200, "Login successfully", DoctorsDetails);
        }
        else{

          res.success(200, "Login successfully", patientDetails);
        }
      }
     catch(e){

      return res.error(500, "server_error");

     }

      });

router.post('/forgotpassword',  function(req, res) {

      Patient.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.error(500, "Internal server Error");
        if (!user) return res.error(404, "No User Found");
        var password = await Patient.find({Email:req.body.Email}).select('password');
        console.log(password);
       var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'anjani513devi@gmail.com',
            pass: 'anjanichotu@24'
          }
        });

        var mailOptions = {
          to: req.body.Email,
          subject: 'Forgot password Mail',
          text: "Please check your password" +password,
      };
       transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log("erorr related the mail ", error);
          } else {
          console.log('Email sent: ' + info.response);
          }
        });
        res.success(200, "Password has been sent to the registered Email ID");
      });

});

router.get('/getlist', function (req, res) {
        Patient.find({}, function (err, patients) {
            if (err) return res.error(500 , "There was a problem finding the PatientList.");
             res.success(200, "Patientlist",patients);
        });
});
// router.get('/viewData/:id', VerifyToken, function (req, res) {
//       User.findById(req.params.id, function (err, user) {
//           if (err) return res.status(500).send("There was a problem finding the user.");
//           if (!user) return res.status(404).send("No user found.");
//           res.status(200).send(user);
//       });
// });

// router.put('/edit/:id',VerifyToken, function (req, res) {
//         User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//             if (err) return res.status(500).send("There was a problem updating the user.");
//             res.status(200).send(user);
//         });
// });
// // DELETES A USER FROM THE DATABASE
// router.delete('/delete/:id',VerifyToken, function (req, res) {
//       User.findByIdAndRemove(req.params.id, function (err, user) {
//           if (err) return res.status(500).send("There was a problem deleting the user.");
//           res.status(200).send("User: "+ user.name +" was deleted.");
//       });
// });

module.exports = router;