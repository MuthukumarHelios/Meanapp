console.log("this file contains the db.js");

console.log("mongo db setup from the server");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
//==>user Collection is meant for the registration form
var userschema = new Schema({
   name               : {type: String,required: true},
   password           : {type: String,required: true},
   created_at         : { type: Date, default: Date.now },
   email              : {type: String,required: true}
});
var postschema = new Schema({
  uid : [{ type: String, ref: 'user' }],
  title: {type: String,required: true},
  body : {type: String,required: true},
  created_at: { type: Date, default: Date.now }
});

var voteschema = new Schema({
  voted_by    :  [{ type: String,ref: 'user' }],
  post_id     :  [{ type: String, ref: 'post' }],
  voted_at    :  { type: Date, default: Date.now }
});

//these db shows the details that show by the group created by users
mongoose.connect('mongodb://localhost/nfn', {
  // using mongoose client to avoid promises exception
  useMongoClient: true,
});
// making my model available through out the app
module.exports= {
user : mongoose.model('user', userschema),
post : mongoose.model('post', postschema),
vote : mongoose.model('vote',voteschema)
};
