var basicAuth = require('basic-auth');
var users = require('../../lib/user');

exports.auth = function(req,res,next){
  var remoteUser = basicAuth(req);
  users.authenticate(remoteUser.name,remoteUser.pass,function(err,user){
    if(err) return next(err);
    if(!user) res.json({result:'User not found or the password not right'});
    if(user){
       req.remoteUser = res.locals.user = user;
       next();
    }
  });
};
exports.user = function(req,res,next){
  users.getByName(req.params.name,function(err,user){
    if(err) return next(err);
    if(!user._id) return res.json({result:'not found'});
    req.remoteUser = user;
    res.json({
      id:user._id,
      name:user.name
    });
  });
};
