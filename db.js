console.log("this file contains the db.js");

console.log("mongo db setup from the server");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//==>user Collection is meant for the registration form
var userschema = new Schema({
   name               : String,
   password           : String,
   created_at         :  Date,
   email              : String,
});

//these db shows the details that show by the group created by users
//"user"-->model for accessing schema user
mongoose.connect('mongodb://localhost/nfn', {
  // using mongoose client to
  useMongoClient: true,
});
module.exports= {
user : mongoose.model('user', userschema)
}
