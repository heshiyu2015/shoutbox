var users = require('../../models/User');

/*users.findOne({'name':'Sbi'},function(err,user){
  if(err) console.log(err);
  console.log(user);
});*/

module.exports = function(req,res,next){
  if(req.remoteUser){
    res.locals.user = req.remoteUser;
  }
  var uid = req.session.uid;
  if(!uid) return next();
  users.findOne({'_id':uid},function(err,user){
    if(err) return next(err);
    req.user = res.locals.user = user;
    next();
  });
};
