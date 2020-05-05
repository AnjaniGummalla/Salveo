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

router.post('/create', function(req, res) {


    var lat = req.body.lat;
   var long = req.body.long;

        Family.create({
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