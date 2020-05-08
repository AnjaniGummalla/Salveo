var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Homebanner = require('./../models/HomebannerModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/create',  async function(req, res) {
try {
        let fields = {

            "Image_link" : req.body.Image_link || "",
            "Added_by": req.body.Added_by || "",
            "Updated_date" : req.body.Updated_date || "",
        }

       var Inserteddata = await Homebanner.create(fields);

          res.success(200, "Details Inserted successfully",Inserteddata);
          
}
        catch(e){
            res.error(500, "Internal server error");
        }

});

router.get('/getlist', function (req, res) {

        Homebanner.find({}, function (err, Homebanners) {
            if (err) return res.status(500).send("There was a problem finding the Homebanners.");
            res.success(200, "Homebannerslist", Homebanners);
        });
});

router.put('/edit/:id', function (req, res) {
            
            Homebanner.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200, "Data Updated Successfully");
        
        });
});
// // DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {
      Homebanner.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting details.");
          res.success(200, "Data Deleted Successfully");
      });
});

module.exports = router;