var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var UserModel = require('./../models/UserModel');
var Doctor = require('./../models/DoctorModel');
var Patient = require('./../models/PatientModel');
var CompanyModel = require("./../models/CompanyModel");
var responseMiddleware = require('./../middlewares/response.middleware');
router.use(responseMiddleware());


router.post('/register', async function(req, res) {
  try{
    console.log("request...",req.body)
    var email = req.body.Email;
    var name = req.body.Name;
    var phone = req.body.Phone;
     var type = req.body.Type;
     var logintype = req.body.Logintype;
     var checkData = await UserModel.findOne({Email:email,Type:type});
     var numberCheck = await UserModel.findOne({Phone:phone,Type:type});
     console.log("check value" ,checkData);
        if(numberCheck !== null){
            
          return  res.error(300, "Account with this number already exists");
             
             }
         if(checkData !== null){
            
           return res.error(300, "Email id already exists");
             
             }

                await UserModel.create({
                Name : req.body.Name || "",
                Email : req.body.Email || "",
                Password : req.body.Password || "",
                Type: type ,
                Phone : req.body.Phone || "",
                Logintype : logintype || "",
                UpdatedAt : req.body.UpdatedAt || "",
                Lastlogin:req.body.Lastlogin || "",
        }, 

          async function (err, user) {
          if (err) return res.error(300, "There was a problem in registering.");

           let fields= {

              "Email" : req.body.Email,
              "Password" : req.body.Password,
              "Name":  req.body.Name,
              "Phone" : req.body.Phone
            }
           if(type == 0){

            var patientdetailsinsertion = await Patient.create(fields);
           }
           else{

          var doctordetailsinsertion = await Doctor.create(fields);
        
        }
          res.success(200, "User registration successful",user);
        });
  }
     catch(e){
      
      res.error(500,"Internal server issue");
     }
});

router.post('/login',  async function(req, res) {
          
          var corporatecode = req.body.corporatecode;

        var patientDetails = await Patient.findOne({Email:req.body.Email});

        var DoctorsDetails = await Doctor.findOne({Email:req.body.Email});
         
          console.log("corporatecode",corporatecode)
      try{

        var Emailcheck = await UserModel.findOne({Email:req.body.Email});

        if(null == Emailcheck){

        res.error(300, "Email not found");

        }

         if('null' != corporatecode){

          var CorporateCodedata = await CompanyModel.findOne({Corporatecode:req.body.corporatecode});
          console.log("details.........", CorporateCodedata)
          
          if(CorporateCodedata == null){

            res.error(300,"corporate code does not exists");
          }
          else
            var PasswordCheck1 = await UserModel.find({Email:req.body.Email,Password:req.body.Password});

         if (!PasswordCheck1) return res.error(401,"Incorrect password");

           return res.success(200, "Login successfully", patientDetails);
        }
        else
        {
        var PasswordCheck = await UserModel.find({Email:req.body.Email,Password:req.body.Password});

         if (!PasswordCheck) return res.error(401,"Incorrect password");
   
        if(patientDetails == null){

          res.success(200, "Login successfully", DoctorsDetails);
        }
        else{

          res.success(200, "Login successfully", patientDetails);
        }
      }
    }
     catch(e){
      console.log("errorrrr..........", e)

      return res.error(500, "server_error");

     }

      });

router.post('/numberlogin',  async function(req, res) {
          
          var corporatecode = req.body.corporatecode;
         
          console.log("corporatecode",corporatecode)
      try{

        var Phonecheck = await UserModel.findOne({Phone:req.body.Phone});

        console.log(Phonecheck);

        if( null == Phonecheck){

           console.log("entered");


        return res.error(300, "PhoneNumber not found");

        }

        var patientDetails = await Patient.findOne({Phone:req.body.Phone});

        var DoctorsDetails = await Doctor.findOne({Phone:req.body.Phone});
       
        

         if('null' != corporatecode){

          var CorporateCodedata = await CompanyModel.findOne({Corporatecode:req.body.corporatecode});
          console.log("details.........", CorporateCodedata)
          
          if(CorporateCodedata == null){

            res.error(300,"corporate code does not exists");
          }
          else{
            var PasswordCheck1 = await UserModel.find({Phone:req.body.Phone,Password:req.body.Password});
          }

         if (!PasswordCheck1) return res.error(300,"Incorrect password");

           return res.success(200, "Login successfully1", patientDetails);
        }
        else
        {
        var PasswordCheck = await UserModel.find({Phone:req.body.Phone,Password:req.body.Password});

         if (!PasswordCheck) return res.error(300,"Incorrect password");
   
        if(patientDetails == null){

          res.success(200, "Login successfully2", DoctorsDetails);
        }
        else{

          res.success(200, "Login successfully3", patientDetails);
        }
      }
    }
     catch(e){

      return res.error(500, "server_error");

     }

      });

router.post('/forgotpassword',  function(req, res) {

      UserModel.findOne({ Email: req.body.Email }, async function (err, user) {
        if (err) return res.error(500, "Internal server Error");
        if (!user) return res.error(404, "No User Found");
        var passworddata = await UserModel.findOne({Email:req.body.Email}).select('Password');
        console.log(passworddata);
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
          text: "Please check your password" + "<html><h1> passworddata.Password </h1></html> " + passworddata.Password,
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

        UserModel.find({}, function (err, users) {
            if (err) return res.error(500 , "There was a problem finding the Userslist.");
             res.success(200, "Userslist",users);
        
        });
});

router.put('/edit/:id', function (req, res) {

        UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.success(200,"User updated successfully",user);
        });
});

// DELETES A USER FROM THE DATABASE
router.delete('/delete/:id', function (req, res) {

      UserModel.findByIdAndRemove(req.params.id, function (err, user) {
          if (err) return res.status(500).send("There was a problem deleting the user.");
         res.success(200,"User Deleted successfully");
      });
});

router.post('/patientdetails', function (req, res) {
    
     var email = req.body.Email;

        Patient.findOne({Email:email}, function (err, users) {
            if (err) return res.error(500 , "There was a problem finding the Patientlist.");
             res.success(200, "patientdata", users);
        
        });
});
router.post('/familydetails', async function (req, res) {
  try{
     var email = req.body.Email;

    var familydetails = await Patient.findOne({Email:email}).populate('Family').select('Family');
    res.success(200, "FamilyDetails",familydetails);
    
  }
  catch(e){
     res.error(500, "Internal server error");
  }
   
});
module.exports = router;