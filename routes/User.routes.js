var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var UserModel = require('./../models/UserModel');
var Doctor = require('./../models/DoctorModel');
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/register', async function(req, res) {
     var email = req.body.Email;
     var type = req.body.Type;
     var checkData = await UserModel.findOne({Email:email,Type:type});
     console.log("check value" ,checkData);
        if(checkData !== null){
            
            res.sucess(200, "Email id already exists");
             
             }
                await UserModel.create({
                Name : req.body.Name,
                Email : req.body.Email,
                Password : req.body.Password,
                Type:req.body.Type,
                Phone : req.body.Phone,
                Logintype : req.body.Logintype,
                UpdatedAt : req.body.UpdatedAt,
                Lastlogin:req.body.Lastlogin,
        }, 

          function (err, user) {
          if (err) return res.error(500, "There was a problem in registering.");
           console.log(err)

          res.success(200, "User registration successful");
        });
});


router.get('/getlist', function (req, res) {

        UserModel.find({}, function (err, users) {
            if (err) return res.error(500 , "There was a problem finding the Userslist.");
             res.success(200, "Userslist",users);
        
        });
});

router.put('/edit/:id', function (req, res) {

        UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200,"User updated successfully");
        });
});

// DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {

      UserModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
         res.success(200,"User Deleted successfully");
      });
});

module.exports = router;