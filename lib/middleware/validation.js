exports.required = function(field){
  return function(req,res,next){
    if(req.body[field]){
      next();
    }else{
      res.error(field + ' is required');
      res.redirect('back');
    }
  };
};

exports.lengthAbove = function(field,len){
  return function(req,res,next){
    if(req.body[field].length >= len){
      next();
    }else{
      res.error(field + ' must have more than ' + len + ' characters');
      res.redirect('back');
    }
  };
};
