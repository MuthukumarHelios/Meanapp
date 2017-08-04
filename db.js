console.log("this file contains the db.js");

console.log("mongo db setup from the server");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//==>user Collection is meant for the registration form
var userschema = new Schema({
   name               : String,
   password           : String,
   created_at         : { type: Date, default: Date.now },
   email              : String,
});
var postschema = new Schema({
  uid : [{ type: String, ref: 'user' }],
  title: String,
  body : String,
  created_at: { type: Date, default: Date.now }
});

var voteschema = new Schema({
  voted_by    :  [{ type: String, ref: 'user' }],
  post_id     :  [{ type: String, ref: 'post' }],
  voted_at    :  { type: Date, default: Date.now }
});

//these db shows the details that show by the group created by users
mongoose.connect('mongodb://localhost/nfn', {
  // using mongoose client to
  useMongoClient: true,
});
//"user"-->model for accessing schema user
module.exports= {
user : mongoose.model('user', userschema),
post : mongoose.model('post', postschema),
vote : mongoose.model('vote',voteschema)
};
