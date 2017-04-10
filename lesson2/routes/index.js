var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'this is in router file',
  	nowTime:new Date(),
  	testData:{
  		data1:'test'
  	}
  	});
});

module.exports = router;


