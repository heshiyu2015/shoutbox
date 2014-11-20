var express = require('express');
var router = express.Router();
var Entry = require('../lib/entry');

router.get('/',function(req,res,next){
	  var page = req.page;
          console.log(page);//Test
	  Entry.getRangeEntry(page.from,page.to,function(err,entries){
	    if(err) return next(err);
	    res.render('entries',{
	      title:'Entries',
	      entries:entries
	    });
	  });
});

module.exports = router;
