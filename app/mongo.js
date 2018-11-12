// configure the database
import { url } from './config/database.config.js';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch((err) => {
  console.error("Could not connect to the database. Exiting now...", err);
  process.exit();
});