var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Doctor = require('./../models/DoctorModel');
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

        Doctor.create({
         Name: req.body.Name,
         Email:req.body.Email,
         Password:req.body.Password,
         ContactNumber:req.body.ContactNumber,  
         DOB : req.body.DOB,
         Languages: req.body.Languages,
         Qualifications : req.body.Qualifications,
         HighestQualifications: req.body.HighestQualifications,
         Specilization: req.body.Specilization,
         Year_of_Passout: req.body.YearPassing,
          Current_location: { 
              "type": "Point",
              "coordinates": [lat,long]
            },
         Experience: req.body.Experience,
         Current_employee_id: req.body.Current_employee_id,
         EmployeeAt: req.body.EmployeeAt,
         AvailableHours: req.body. AvailableHours,
         OnlineConsultant: req.body.OnlineConsultant,
         Information: req.body.Information,
          login_type : req.body.login_type,
          Updated_At : req.body.Updated_At,
          last_login_time: req.body.last_login_time,
          Available_type: req.body.Available_type,
          Service: req.body.Service,
          Special_mention:req.body.Special_mention,
          Charge_Per_15min:req.body.Charge_Per_15min,
        }, 

        function (err, user) {
          if (err) return res.status(500).send({message:"There was a problem registering."});
          console.log(err)

          res.success(200, "Details Inserted successfully");
        });

});
router.post('/login', function(req, res) {

      Doctor.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = await Doctor.find({Email:req.body.Email,Password:req.body.Password});
        var DoctorDetails = await Doctor.findOne({Email:req.body.Email});
        if (!passwordIsValid) return res.status(401).send({ auth: false, message: "Incorrect password" });
        //if(!CustomerCode) return res.status(401).send("Customer code not applicable");

        // if user is found and password is valid
        // create a token
        // var token = jwt.sign({ id: user._id }, config.secret, {
        //   expiresIn: 86400 // expires in 24 hours
        // });

        // return the information including token as JSON
         res.success(200, "Login successfully", DoctorDetails);
      });

});
router.post('/forgotpassword',  function(req, res) {

      Doctor.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var password = await Doctor.find({Email:req.body.Email}).select('password');
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

        Doctor.find({}, function (err, doctors) {
            if (err) return res.status(500).send("There was a problem finding the Doctors.");
            res.success(200, "doctorslist",doctors);
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
        Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200, "Data Updated Successfully");
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      User.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
          res.success(200, "Data Deleted Successfully");
      });
});

module.exports = router;