var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Title' });  
});

/* GET calendar page. */
router.get('/calendar', function(req, res, next) {
  res.render('calendar', { title: 'Title' });  
});

module.exports = router;
