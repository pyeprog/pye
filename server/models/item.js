const path = require('path');
const {ObjectID} = require('mongodb');
const {mongoose} = require(path.join(__dirname, '..', 'mongoose/mongoose'));

var listItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  date: {
    type: Date,
    default: Date.now()
  },
  group: {
    type: String,
    default: "Recent"
  },
  articleId: {
    type: String,
    required: true,
    validate: {
      validator: ObjectID.isValid,
      message: '{VALUE} is not a valid ObjectID'
    }
  }
});

var ArticleListItem = mongoose.model("ArticleListItem", listItemSchema);

module.exports = {ArticleListItem};
