var users = require('../models/User');
var bcrypt = require('bcrypt');

module.exports = User;

function User(obj){
  for(var key in obj){
    this[key] = obj[key];
  }
}

User.prototype.save = function(fn){
  var that = this;
  users.findOne({'name':that.name},function(err,user){
    if(user) return fn("The user name has been taken");
    else{
      var newUser = new users();
      that.hashPassword(function(err){
        newUser.name = that.name;
        newUser.pass = that.pass;
        newUser.age = that.age;
	newUser.salt = that.salt;
        newUser.save(function(err){
          return fn(err);
        });
      });
    }
  });
};


User.prototype.hashPassword = function(fn){
  var that = this;
  bcrypt.genSalt(12,function(err,salt){
    if (err) return fn(err);
    bcrypt.hash(that.pass,salt,function(err,hash){
      if(err) return fn(err);
      that.salt = salt;
      that.pass = hash;
      fn();
    });
  });
};

User.authenticate = function(name,pass,fn){
  User.getByName(name,function(err,user){
    if(err) return fn(err);
    if(!user) return fn("User not found");
    bcrypt.hash(pass,user.salt,function(err,hash){
      if(err) return fn(err);
      if(hash == user.pass) return fn(null,user);
      return fn("The password is uncorrect");
    });
  });
};

User.getByName = function(name,fn){
  users.findOne({'name':name},function(err,user){
    if(err) return fn(err);
    return fn(null,user);
  });
};

/*var tobi = new User({
  name:'Sbi',
  pass:'im a ferret',
  age:'2'
});

tobi.save(function(err){
  if(err) console.log(err);
});*/


/*User.authenticate("Sbi","im a ferret",function(err,user){
  if(err) console.log(err);
  if(user){
    console.log(user._id);
    console.log(user.name);
    console.log(user.pass);
    users.findOne({'_id':user._id},function(err,userx){
      console.log(userx._id);
      console.log(userx.name);
      console.log(userx.pass);
    });
  }
});*/
/*users.find().limit(2).exec(function(err,usersFound){
  usersFound.forEach(function(userFound){
    console.log(userFound);
  });
});*/



