var Entry = require('../models/Entry');
module.exports = function(req,res,next){
  console.log(req.body);//Test
  var entry = new Entry({
    "username":res.locals.user.name,
    "title":req.body['entry[title]'],
    "body":req.body['entry[body]']
  });

  entry.save(function(err){
    if(err) return next(err);
    if(req.remoteUser){
      res.json({message:'Entry added'});
    }else{
      res.redirect('/');
    }
  });
};
