var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Patient = require('./../models/PatientModel');
var Doctor = require('./../models/DoctorModel');
var Family = require('./../models/FamilyModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());

router.post('/signup',  async function(req, res) {
try {
        var query = {"Email": req.body.Email};
        var lat = req.body.lat || "";
        var long = req.body.long || "";
        let fields = {

            "Name": req.body.Name || "",
            "LastName" : req.body.LastName || "",
            "Age": req.body.Age || "",
            "Gender" : req.body.Gender || "",
            "Address": req.body.Address || "",
            "Phone": req.body.Phone || "",
            "CustomerCode": req.body.CustomerCode || "",
            "Invoice": req.body.Invoice || "",
            "Height" : req.body.Height || "",
            "Weight" : req.body.Weight || "",
            "Suffering_for": req.body.Suffering_for || "" ,
            "Looking_doctor_like": req.body.Looking_doctor_like || "",
            "Looking_doctor_specialisation": req.body.Looking_doctor_specialisation || "",
            "Current_location": { 
                        "type": "Point",
                        "coordinates": [lat,long]
                      },
            "Documents": req.body.Documents || "" ,
            "Attach_prescription": req.body.Attach_prescription || "",
            "About_me": req.body.About_me || "",
            "Update_date": req.body.Update_date || "",
            "last_login_time": req.body.last_login_time || "",

        }

       var Inserteddata = await Patient.findOneAndUpdate(query,fields,{new: true});

          res.success(200, "Details Inserted successfully",Inserteddata);
          
}
        catch(e){
            res.error(500, "Internal server error");
        }

});


router.get('/getlist', function (req, res) {

        Patient.find({}, function (err, Data) {
            if (err) return res.error(500 , "There was a problem finding the PatientList.");
             res.success(200, "Patientlist",Data);
        })
});

router.put('/edit/:id', function (req, res) {
        Patient.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Data) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200, "Data updated successfully",Data);
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Patient.findByIdAndRemove(req.params.id, function (err, Data) {
          if (err) return res.status(500).send("There was a problem deleting the Data.");
           res.success(200, "Data Deleted Successfully",Data);
      });
});

module.exports = router;