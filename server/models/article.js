const path = require('path');
const {mongoose} = require(path.join(__dirname, '..', 'mongoose/mongoose'));
const {ArticleListItem} = require('./item');

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
  },
  group: {
    type: String,
    default: "Recent"
  }
});

articleSchema.post('save', function(doc, next) {
  var description = doc.body.slice(0, 5);
  var newListItem = new ArticleListItem({
    title: doc.title,
    group: doc.group,
    articleId: doc._id
  });
  newListItem.save().then(next());
});

var Article = mongoose.model("Article", articleSchema);

module.exports = {Article};
