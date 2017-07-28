'use strict';
var express = require('express');
var router = express.Router(),
bcrypt = require("bcrypt-nodejs"),

db = require("./db.js");
console.log("total db",db.user);
/* GET home page. */
router.post("/user/register", function(req, res){
  console.log(req.body);
var dbdata = {
  name : req.body.name,
  password:req.body.password,
  email   : req.body.email,
  created_at: new Date()
};
if(req.body.password != req.body.confirmpass){
    return res.json("kindy provide valid confirmpass");}
      dbdata.password =  bcrypt.hashSync(dbdata.password);
       console.log(dbdata);
         db.user.create(dbdata, function(err, cb){
             if(err){return res.json("dbexception")};
                 return res.json(cb);
                });

    });

// meant for user login with bcryp
router.post("/user/login", function(req, res){

    var dbdata = {
      email: req.body.email,
       password: req.body.password
  };
   db.user.find({email: dbdata.email}, function(err, data){
     if(err|| data.length == 0 ){return res.json({error: true, message: "invalid credentials"});}
      if(bcrypt.compareSync(dbdata.password, data[0].password)){
      return res.json({error:false, message: "successfully logged in"});
    }return res.json({error: true, message: "invalid credentials"});
   });
});

router.get('/test', function(req, res) {
  res.sendFile((__dirname+'/views/index.html'));
});

module.exports = router;
