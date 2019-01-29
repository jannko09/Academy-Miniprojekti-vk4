var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user's all projects and tasks for specific date or date range */
router.get('/projects/:date', function(req, res, next) {
  // Get user id from session info
  
  //res.send();
});


module.exports = router;
