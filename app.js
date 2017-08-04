var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer')().any();
var controller = require('./controller.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//express stativ view used for simple heelo world test case

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(multer);
app.use(controller);

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status = 404;
  res.json({error:true, message: "pagenot found"});
});
// error handler for
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
   err.status = 500;
   res.json({error: true, message:err.message})
});
module.exports = app;
