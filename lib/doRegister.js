var User = require('../lib/user');


module.exports = function(req,res,next){
      User.getByName(req.body['user[name]'],function(err,user){
        if(err) return next(err);

        if(user){
          res.error("Username already taken");
          res.redirect('back');
        }else{
          user = new User({
            name:req.body['user[name]'],
            pass:req.body['user[pass]']
          });

          user.save(function(err){
            if(err) return next(err);
            res.redirect('/');
          });
        }
      });
};

