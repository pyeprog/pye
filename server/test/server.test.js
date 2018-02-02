const path = require('path');
const {app} = require(path.join(__dirname, '..', 'server'));
const expect = require('expect');
const request = require('supertest');
const Article = require(path.join(__dirname, '..', 'models/article'))
const ArticleListItem = require(path.join(__dirname, '..', 'models/articleListItem'))

var article1 = {
  title: "This is the first test article",
  author: "PD",
  body: "#nothing here except a title",
  group: "NOthing"
}

var article2 = {
  title: "This is the second test article",
  author: "PD too",
  body: "no title provided, only a **one-sentence** paragraph",
  group: "something"
}

beforeEach((done) => {
  Article.remove({}).then(() => {
    return ArticleListItem.remove({});
  }).then(() => {
    var doc1 = new Article(article1);
    return doc1.save();
  }).then(() => {
    var doc2 = new Article(article2);
    return doc2.save();
  }).then(() => done()).catch((e) => {
    console.log(e);
  });
});

describe('POST /article/write', () => {
  it('should save the valid post text', (done) => {
    done();
  });
});
