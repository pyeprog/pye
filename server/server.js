const express = require('express');
const {ObjectID} = require('mongodb');
const {Article} = require('./models/article');
const pug = require('pug');
const MarkdownIt = require('markdown-it');
const _ = require('lodash');
const moment = require('moment');

var app = express();
var mdEngine = new MarkdownIt();

app.set('view engine', 'pug');
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/js', express.static('public/js'));

app.get('/:id', (req, res) => {
  var curId = ObjectID(req.params.id);
  Article.findById(curId, (err, article) => {
    if (err) {
      throw new Error(err);
    }
    return article;
  }).then((article) => {
    var body = _.get(article, 'body');
    body = mdEngine.render(body);
    console.log(body);
    res.render('article.pug', {body});
  });
});

app.get('/', (req, res) => {
  res.render('articlelist.pug', {
    articles: [
      {
        title: "This is not bad",
        date: moment().format("l"),
        plink: "http://www.baidu.com"
      },
      {
        title: "This is bad actually",
        date: moment().format("l"),
        plink: "http://www.douban.com"
      },
      {
        title: "This is not bad",
        date: moment().format("l"),
        plink: "http://www.baidu.com"
      },
      {
        title: "This is bad actually",
        date: moment().format("l"),
        plink: "http://www.douban.com"
      },
      {
        title: "This is not bad",
        date: moment().format("l"),
        plink: "http://www.baidu.com"
      },
      {
        title: "This is bad actually",
        date: moment().format("l"),
        plink: "http://www.douban.com"
      }
    ]
  });
});

app.listen(3000, () => {
  console.log('Server is running or port 3000');
});
