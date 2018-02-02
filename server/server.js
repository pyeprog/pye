require('./config/config');

const express = require('express');
const {ObjectID} = require('mongodb');
const Article = require('./models/article');
const ArticleListItem = require('./models/articleListItem');
const pug = require('pug');
const MarkdownIt = require('markdown-it');
const bodyParser = require('body-parser');
const _ = require('lodash');
const moment = require('moment');

var app = express();
var mdEngine = new MarkdownIt();

app.set('view engine', 'pug');
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/js', express.static('public/js'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect('/article/all');
});

app.get('/article/all', (req, res) => {
  ArticleListItem.find({}).then((docs) => {
    var articles = [];
    docs.forEach((doc) => {
      article = _.pick(doc, ['title', 'date', 'cardimage', 'group', 'nViews']);
      article["articleLink"] = `/article/id/${doc.articleId}`;
      article.date = moment(article.date).format("l");
      articles.push(article);
    });
    res.render('articlelist.pug', {articles});
  });
});

app.get('/article/write', (req, res) => {
  res.render('articlecreate.pug');
});

app.post('/article/write', (req, res) => {
  var text = _.pick(req.body, ['title', 'author', 'body', 'cardimage']);
  var article = new Article(text);
  article.save().then((doc) => {
    res.status(200).send('Article saved');
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/article/id/:id', (req, res) => {
  if (! ObjectID.isValid(req.params.id)) {
    return res.status(404).send("Article ID is invalid");
  }
  var curId = ObjectID(req.params.id);
  Article.findByIdAndUpdate(curId, {
    $inc: {"nViews": 1}
  }, {
    new: true
  }).then((article) => {
    article.body = mdEngine.render(article.body);
    return new Promise((resolve, reject) => {
      res.render('article.pug', {
        group: article.group,
        title: article.title,
        author: article.author,
        body: article.body,
        date: moment(article.date).format("l"),
        nViews: article.nViews
      });
      resolve(article._id);
    })
  }).then((articleId) => {
    ArticleListItem.findOneAndUpdate({articleId}, {$inc: {"nViews": 1}}, (err, data) => {
      if (err) {
        return console.log(err);
      }
    });
  }).catch((e) => {
    throw new Error(e);
  });
});

app.delete('/article/id/:id', (req, res) => {
  if (! ObjectID.isValid(req.params.id)) {
    return res.status(404).send("Article ID is invalid");
  }
  var curId = ObjectID(req.params.id);
  Article.findById(curId).then((doc) => {
    return doc.remove();
  }).then(() => {
    res.status(200).send('Article deleted');
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is on port ${process.env.PORT}`);
});

module.exports = {app};
