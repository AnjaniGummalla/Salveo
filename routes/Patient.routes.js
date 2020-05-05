var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var Family = require('./../models/FamilyModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());
/**
 * Configure JWT
 */
//var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var config = require('../config'); // get config file

router.post('/signup', function(req, res) {


    var lat = req.body.lat;
   var long = req.body.long;

        Patient.create({
            Name: req.body.Name,
            LastName : req.body.LastName,
            Email: req.body.Email,
            Age: req.body.Age,
            Gender : req.body.Gender,
            Password: req.body.Password,
            Address: req.body.Address,
            Phone: req.body.Phone,
            CustomerCode: req.body.CustomerCode,
            Invoice: req.body.Invoice,
            Height : req.body.Height,
            Weight : req.body.Weight,
            Suffering_for: req.body.Suffering_for,
            Looking_doctor_like: req.body.Looking_doctor_like,
            Looking_doctor_specialisation: req.body.Looking_doctor_specialisation,
            Current_location: { 
                        "type": "Point",
                        "coordinates": [lat,long]
                      },
            Company: req.body.Company,
            Documents: req.body.Documents,
            Attach_prescription: req.body.Attach_prescription,
            About_me: req.body.About_me,
            Update_date: req.body.Update_date,
            last_login_time: req.body.last_login_time,
            login_type: req.body.login_type

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

router.put('/edit/:id', function (req, res) {
        Patient.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.status(200).send(user);
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Patient.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.status(200).send("User: "+ user.name +" was deleted.");
      });
});

router.post('/family', function(req, res) {


    var lat = req.body.lat;
   var long = req.body.long;

        Patient.create({
            Name: req.body.Name,
            Email_id: req.body.Email_id,
            LastName: req.body.LastName,
            Suffering_for: req.body.Suffering_for,
            Looking_doctor_like: req.body.Looking_doctor_like,
            Looking_doctor_specialisation: req.body.Looking_doctor_specialisation,
            Current_location: { 
                                  "type": "Point",
                                  "coordinates": [lat,long]
                                },
            
            DOB : req.body.DOB,
            Attach_documents: req.body.Attach_documents,
            Attach_prescription: req.body.Attach_prescription,
            Relation :req.body.Relation,
            Age: req.body.Age,
            Gender : req.body.Gender,
            BloodGroup : req.body.BloodGroup,
            ContactNumber:req.body.ContactNumber,
            Information: req.body.Information,

        }, 

        function (err, user) {
          if (err) return res.status(500).send("There was a problem registering.");
          console.log(err)

          res.success(200, "Family details Inserted successfully");
        });

});
router.get('/getlist', function (req, res) {

        Family.find({}, function (err, patients) {
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

router.put('/edit/:id', function (req, res) {
        Family.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.status(200).send(user);
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Family.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.status(200).send("User: "+ user.name +" was deleted.");
      });
});
module.exports = router;