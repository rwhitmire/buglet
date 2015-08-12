var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Incident = mongoose.model('Incident');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var incident = new Incident(req.body);
  incident.save();

  res.send('thanks.');
});

module.exports = router;
