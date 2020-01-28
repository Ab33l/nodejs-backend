var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/triangles', function(req, res, next) {
  res.render('triangle', { title: 'Triangle Checker' });
});

module.exports = router;
