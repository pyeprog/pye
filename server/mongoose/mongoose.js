const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog").then(
  () => {
    console.log('Connected to mongodb');
  },
  (err) => {
    console.log(err);
  }
);

module.exports = {mongoose};
