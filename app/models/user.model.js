import { Schema, model } from 'mongoose';

// TODO: https://codeforgeek.com/2015/08/restful-api-node-mongodb/

var userSchema  = Schema({
    username: {
      type: String,
      // will trigger a MongoError with code 11000 when you save a duplicate
      unique: true,
      minlength: 3
    },
    password: String,
    role: String
}, {
  timestamps: true
});

// Handler **must** take 3 parameters: the error that occurred, the document
// in question, and the `next()` function
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next();
  }
});

export default model('user', userSchema);