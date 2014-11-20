var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_app');

module.exports = mongoose;
