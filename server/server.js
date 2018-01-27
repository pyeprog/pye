const express = require('express');
const pug = require('pug');

var app = express();

app.set('view engine', 'pug');
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/js', express.static('public/js'));

app.get('/', (req, res) => {
  res.render('index.pug', {});
});

app.listen(3000, () => {
  console.log('Server is running or port 3000');
});
