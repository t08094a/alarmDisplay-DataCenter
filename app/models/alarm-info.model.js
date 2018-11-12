import mongoose from 'mongoose';

const AlarmInfoSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  priority: Number,
  comment: String,
  placeOfAction: {
    street: String,
    houseNumber: String,
    city: String,
    addition: String,
    geoPosition: {
      x: String,
      y: String
    }
  },
  keywords: {
    keyword: String,
    emergencyKeyword: String,
    b: String,
    r: String,
    s: String,
    t: String
  },
  resources: [{
    name: String,
    equipments: [{
      name: String
    }]
  }]
}, {
  timestamps: true
});

AlarmInfoSchema.post('init', function(doc) {
  console.log('%s has been initialized from the db', doc._id);
});
AlarmInfoSchema.post('validate', function(doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
});
AlarmInfoSchema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});
AlarmInfoSchema.post('remove', function(doc) {
  console.log('%s has been removed', doc._id);
});

module.exports = mongoose.model('AlarmInfo', AlarmInfoSchema);