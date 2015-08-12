var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncidentSchema = new Schema({
  date: {
    type: Date,
    default: function() {
      return new Date();
    }
  },
  email: String,
  message: String,
  resolved: {type: Boolean, default: false}
});

IncidentSchema.statics.resolveAll = function(incidents, callback) {
  var schema = this;
  var promises = [];

  if(!incidents) {
    callback();
  }

  if(typeof incidents == 'string') {
    incidents = [incidents];
  }

  incidents.forEach(id => {
    var promise = schema.update({_id: id}, { $set: { resolved: true }}).exec();
    promises.push(promise);
  });

  var promise = Promise.all(promises);
  
  promise.then(() => {
    callback();
  });

  promise.catch(err => {
    callback(err);
  });
}

mongoose.model('Incident', IncidentSchema);
