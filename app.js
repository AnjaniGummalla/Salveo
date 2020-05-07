var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');	
var fileUpload = require('express-fileupload');
var patientRouter = require('./routes/Patient.routes');
var doctorRouter = require('./routes/Doctor.routes');
var CompanyRouter = require('./routes/Company.routes');
var UserRouter = require('./routes/User.routes');
var FamilyRouter = require('./routes/Family.routes');
var PaymentRouter = require('./routes/Payment.routes');
var HomebannerRouter = require('./routes/Homebanner.routes');
var DoctorTypeRouter = require('./routes/Doctortype.routes');

var responseMiddleware = require('./middlewares/response.middleware');


const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/Salveo'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

app.use(fileUpload());
app.use(responseMiddleware());

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.error(300,'No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = __dirname + '/uploads/' + sampleFile.name;
   console.log("uploaded path",uploadPath )

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
    	console.log(err)
      
   return res.error(500, "Internal server error");
    }

   return res.success(200,"file upload success",uploadPath);
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', patientRouter);
app.use('/user',UserRouter);
app.use('/doctor', doctorRouter);
app.use('/company',CompanyRouter);
app.use('/family',FamilyRouter);
app.use('/payment',PaymentRouter);
app.use('/homebanner',HomebannerRouter);
app.use('/doctortype',DoctorTypeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
