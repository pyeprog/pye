const path = require('path');
const {mongoose} = require(path.join(__dirname, '..', 'mongoose/mongoose'));
const ArticleListItem = require('./articleListItem');

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
    minlength: 1,
  }, 
  date: {
    type: Date,
    default: Date.now
  },
  group: {
    type: String,
    default: "Recent"
  },
  cardimage: {
    type: String,
    required: true
  },
  nViews: {
    type: Number,
    default: 0
  }
});

articleSchema.post('save', function(doc, next) {
  var newListItem = new ArticleListItem({
    title: doc.title,
    group: doc.group,
    articleId: doc._id,
    cardimage: doc.cardimage,
    nViews: doc.nViews
  });
  newListItem.save().then(next());
});

articleSchema.post('remove', function(doc, next) {
  ArticleListItem.remove({articleId: doc._id}).then(next());
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
