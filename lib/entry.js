var entries = require('../models/Entry');

module.exports = Entry;

function Entry(obj){
  for(var key in obj){
    this[key] = obj[key];
  }
}

Entry.prototype.save = function(fn){
  var newEntry = new entries();
  newEntry.username = this.username;
  newEntry.title = this.title;
  newEntry.body = this.body;
  newEntry.save(function(err){
    if(err) return fn(err);
  });
};

Entry.getRangeEntry = function(from,to,fn){
  entries.find({}).skip(from).limit(to - from + 1).exec(function(err,entriesFound){
    if(err) return fn(err);
    var theEntries = [];
    entriesFound.forEach(function(entryFound){
      theEntries.push(entryFound);
    });
    fn(null,theEntries);
  });
};

Entry.getTotal = function(fn){
  entries.find({},function(err,entriesFound){
    if(err) return fn(err);
    fn(null,entriesFound.length);
  });
};

/*var from = 4;
var start = from > 0?from - 1:0;
console.log(start);*/

/*var myEntry = new Entry({
  username:'heshiyu',
  title:'eat',
  body:'hiahiahia taste good'
});

myEntry.save(function(err){
 if(err) console.log(err);
});*/


