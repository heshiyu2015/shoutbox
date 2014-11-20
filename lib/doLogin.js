var User = require('./user');

module.exports = function(req,res,next){
  User.authenticate(req.body['user[name]'],req.body['user[pass]'],function(err,user){
    if(err) res.error(err);
    if(user){
      req.session.uid = user._id;
      res.redirect('/');
    }else{
      res.error("Sorry!Invalid credentials");
      res.redirect('back');
    }
  });
};
