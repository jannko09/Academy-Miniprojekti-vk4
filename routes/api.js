var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
//DELETE THIS
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user's all projects and tasks for specific date or date range */
router.get('/projects', function(req, res, next) {
  
  // Get user id from session info
  let userID = 1;     // change later (req.session.userID)
  
  let users = fs.readFileSync('./json/users.json');
  users = JSON.parse(users);
  console.log(users);
  res.json(users);
});


module.exports = router;
