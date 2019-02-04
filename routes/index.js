var express = require('express');
var router = express.Router();

/* GET calendar page. */
router.get('/calendar', function (req, res, next) {
  res.render('calendar', { title: 'Title', user: req.session.userid });
});

/* GET login page */
router.get('/', function (req, res, next) {
  if (req.session.userid) {
    res.render('calendar', { title: 'Title', user: req.session.userid });
  } else {
    res.render('login', { title: 'Title', user: req.session.userid });
  }
});

router.get('/logout', function (req, res, next) {
  req.session.userid = '';
  res.render('login', { title: 'Title', user: req.session.userid })
});

module.exports = router;
