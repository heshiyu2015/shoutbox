//var mongoose = require('mongoose');
var mongoose =require('./createConnect');
var bcrypt = require('bcrypt');

//mongoose.connect('mongodb://localhost/user_app');

var schema = new mongoose.Schema({
  name:String,
  pass:String,
  age:String,
  salt:String
});

module.exports = mongoose.model('User',schema);

