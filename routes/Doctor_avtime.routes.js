var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Doctor_time = require('./../models/Doctor_timeModel');
var Doctor = require('./../models/DoctorModel');
var Family = require('./../models/FamilyModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());

router.post('/create',  async function(req, res) {
try {
        let fields = {

            "Doctor_name" : req.body.Doctor_name || "",
            "Doctor_email_id": req.body.Doctor_email_id || "",
            "Doctor_ava_Date" : req.body.Doctor_ava_Date || "",
             "Time" : req.body.Time || "",
            "Comm_type_chat": req.body.Comm_type_chat || "",
            "Comm_type_video" : req.body.Comm_type_video || "",
        }

       var Inserteddata = await Doctor_time.create(fields);

          res.success(200, "Details Inserted successfully",Inserteddata);
          
}
        catch(e){
            res.error(500, "Internal server error");
        }

});


router.post('/getlist', function (req, res) {
        var Doctoremail = req.body.Doctor_email_id;

        Doctor_time.findOne({Doctor_email_id:Doctoremail}, function (err, Data) {
            if (err) return res.error(500 , "There was a problem finding data.");
             res.success(200, "Time availability",Data);
        })
});

router.put('/edit/:id', function (req, res) {
        Doctor_time.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Data) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200, "Data updated successfully",Data);
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Doctor_time.findByIdAndRemove(req.params.id, function (err, Data) {
          if (err) return res.status(500).send("There was a problem deleting the Data.");
           res.success(200, "Data Deleted Successfully",Data);
      });
});

module.exports = router;