var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Doctor = require('./../models/DoctorModel');
/**
 * Configure JWT
 */
//var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var config = require('../config'); // get config file

router.post('/Signup', function(req, res) {

        Doctor.create({
         FirstName: req.body.FirstName,
         Email:req.body.Email,
         Password:req.body.Password,
         ContactNumber:req.body.ContactNumber,  
         DOB : req.body.DOB,
         Languages: req.body.Languages,
         Qualifications : req.body.Qualifications,
         HighestQualifications: req.body.HighestQualifications,
         Specilization: req.body.Specilization,
         YearPassing: req.body.YearPassing,
         Experience: req.body.Experience,
         CurrentLocation: req.body.CurrentLocation,
         EmployeeAt: req.body.EmployeeAt,
         AvailableHours: req.body. AvailableHours,
         OnlineConsultant: req.body.OnlineConsultant,
         Information: req.body.Information,
        }, 

        function (err, user) {
          if (err) return res.status(500).send({message:"There was a problem registering."});
          console.log(err)

          res.status(200).send({Message:user});
        });

});
router.post('/login', function(req, res) {

      Doctor.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = await Doctor.find({Email:req.body.Email,Password:req.body.Password});
        if (!passwordIsValid) return res.status(401).send({ auth: false, message: "Incorrect password" });
        //if(!CustomerCode) return res.status(401).send("Customer code not applicable");

        // if user is found and password is valid
        // create a token
        // var token = jwt.sign({ id: user._id }, config.secret, {
        //   expiresIn: 86400 // expires in 24 hours
        // });

        // return the information including token as JSON
        res.status(200).send({ Message: "Login Successful", login: "success" });
      });

});

// router.get('/getlist',VerifyToken, function (req, res) {
//         User.find({AdminType:0}, function (err, users) {
//             if (err) return res.status(500).send("There was a problem finding the users.");
//             res.status(200).send(users);
//         });
// });
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