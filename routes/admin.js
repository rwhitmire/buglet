var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Incident = mongoose.model('Incident');

router.get('/', function(req, res, next) {
  Incident.find({resolved: false}, (err, incidents) => {
    if(err) return next(err);
    res.render('admin', {incidents: incidents});
  });
});

router.post('/', function(req, res, next) {
  if(req.body.action === 'resolve') {
    Incident.resolveAll(req.body.incidents, err => {
      if(err) return next(err);
      res.redirect('/admin');
    });
  }
});

module.exports = router;
