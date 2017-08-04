'use strict';
var express = require('express');
var router = express.Router(),
jwt       = require('jsonwebtoken'),
bcrypt = require("bcrypt-nodejs"),
db = require("./db.js");
/* GET home page. */
router.post("/user/register", function(req, res){
  console.log(req.body);
var dbdata = {
  name : req.body.name,
  password:req.body.password,
  email   : req.body.email
};
if(req.body.password != req.body.confirmpass){
    return res.json({error: true , message: "kindy provide valid confirmpass"});}
      dbdata.password =  bcrypt.hashSync(dbdata.password);
       console.log(dbdata);
         db.user.create(dbdata, function(err, cb){
             if(err){return res.json({error: true, message:"kinldy enter the mandatory fields"})};
                 return res.json({error: false , message: "successfully registered"});
                });
    });

// meant for user login with bcrypt {Encryption}
router.post("/user/login", function(req, res){
    var dbdata = {
      email: req.body.email,
       password: req.body.password
  };

// console.log("after token",jwt);
   db.user.find({email: dbdata.email}, function(err, data){
     if(err|| data.length == 0 ){return res.json({error: true, message: "invalid credentials"});}
      if(bcrypt.compareSync(dbdata.password, data[0].password)){
        // var token = jwt.sign({mail: dbdata.email,
        //           expiresInMinutes: 1440
        // },'secret');
        return res.json({error:false,message:"successfully logged in", jwt: "token"});
    }
    return res.json({error:true, message: "invalid credentials"});
   });
});

// the common middle ware meant for authenticate
// router.use(function(req, res, next) {
//
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, 'secret', function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//   }
// });


router.post("/post/create", function(req, res){
var dbdata = {
  uid : req.body.uid,
  title: req.body.title,
  body : req.body.body ,
}
 db.post.create(dbdata, function(err, result){
   if(err)return res.json("error");
   return res.json(result);
 });
});

router.post("/vote/create", function(req, res){
var dbdata = {
   voted_by:req.body.voted_by,
   post_id: req.body.post_id
 };
 db.vote.find({}, function(error, calback){
  if(error){return res.json({error: true, message: "dbexception"});}
  console.log(calback[0]);
  var voted_array = [];
    calback.forEach(function(value){
          voted_array.push(value.voted_by);
    });
    // check whether the user is already voted or not
    var voted_array = voted_array.concat.apply([], voted_array);
    console.log(voted_array);
       if(voted_array.indexOf(dbdata.voted_by) != -1){
         return res.json({error: true, message: "you have already voted"});
       }
    // return res.json("inserted");
      db.vote.create(dbdata, function(err, result){
       if(err)return res.json("error");
       return res.json(result);
    });
  });
});

router.post("/vote/all", function(req, res){
   db.vote.find({}, function(err, data){
    //  api using ternary operator
     err ? res.json("db exception"):res.json(data);
   });
});

router.post("/post/all", function(req, res){
  var search = req.body.search;
   db.post.find({}, function(err, data){
     err ? res.json("db exception"): res.json(data);
   });
});
router.post("/user/all", function(req, res){
  db.user.find({}, function(err, data){
    err ? res.json("db exception"):res.json(data);
  });
});

router.post("/populate", function(req, res){
  db.post.findOne({uid:"597b6797f08b2e6f5bf70003"}).populate('uid').exec(function(err, data){
    if(err)return res.json("db exception");
    return res.json(data);
  });
});
// meant for angular
router.get('*', (req, res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

module.exports = router;
