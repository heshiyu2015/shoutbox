//var mongoose = require('mongoose');
var mongoose =require('./createConnect');
//mongoose.connect('mongodb://localhost/user_app');

var schema = new mongoose.Schema({
  username:String,
  title:String,
  body:String
});

module.exports = mongoose.model('Entry',schema);
