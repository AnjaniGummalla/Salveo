var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var family = require('./../models/FamilyModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());

router.post('/create', async function(req, res) {
  try{
        let request = req.body;
        let patientData = req.body.patientData;
        console.log("patient id in which the data is inserted", patientData);
         var lat = req.body.lat;
         var long = req.body.long;

        await family.create({
            Name: req.body.Name || "",
            Email_id: req.body.Email_id || "",
            LastName: req.body.LastName || "",
            Suffering_for: req.body.Suffering_for || "",
            Looking_doctor_like: req.body.Looking_doctor_like || "",
            Looking_doctor_specialisation: req.body.Looking_doctor_specialisation || "",
            Current_location: { 
                                  "type": "Point",
                                  "coordinates": [lat,long]
                                },
            
            DOB : req.body.DOB || "",
            Attach_documents: req.body.Attach_documents || "",
            Attach_prescription: req.body.Attach_prescription || "",
            Relation :req.body.Relation || "",
            Age: req.body.Age || "",
            Gender : req.body.Gender || "",
            BloodGroup : req.body.BloodGroup || "",
            ContactNumber:req.body.ContactNumber || "",
            Information: req.body.Information || "",

        }, 

       async function (err, user) {
          if (err) return res.status(500).send("There was a problem registering.");
          console.log(err)
          var familyid = await Patient.findByIdAndUpdate(patientData,{Family :user._id} ,{ upsert: true, new: true });
          console.log("familyid updated successfully in the pateint list",familyid )
          res.success(200, "Family details Inserted successfully",user);
        });
}
catch(e){
      res.error(500, "Internal server error");
}
});
router.get('/getlist/', function (req, res) {
       
        var patientid = req.body.pid;
        
        Patient.findById(patientid, function (err, Data) {
            if (err) return res.error(500 , "There was a problem finding the List.");
             res.success(200, "",Data);
        }).populate('Family').select('Family');
});

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