const path = require('path');
const {mongoose} = require(path.join(__dirname, '..', 'mongoose/mongoose'));

var articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  }, 
  author: {
    type: String,
    required: true,
    minlength: 1,
    default: "PD"
  }, 
  body: {
    type: String,
    required: true,
    minlength: 1
  }, 
  date: {
    type: Date,
    default: Date.now
  }
});

var Article = mongoose.model("Article", articleSchema);

module.exports = {Article};
