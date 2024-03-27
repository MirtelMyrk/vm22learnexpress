const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
  secret: 'secret'
}));

app.use(express.urlencoded({
  extended:true
}));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.get('/', (req, res) => {
  res.render('index.njk');
//   console.log('somebody visited');
});

app.get('/page2', (req, res) => {
    res.render('page2.njk');
  });

  app.get('/form', (req, res) => {
    console.log(req.query);
    res.render('form.njk', req.query);
  });

  app.get('/circle', (req, res) => {
    res.render('circle.njk', req.query);
  });

  app.post('/circle', (req, res) => {
    let area = Math.PI * req.body.radius * req.body.radius;
    let pi = Math.PI;
    res.render('circleanswer.njk', {r: req.body.radius, a: area, p: pi});
  });

  const movieController = require ('./src/movieController.js');
  app.use('/movies', movieController);

app.get('/cookie', (req, res) => {
  res.cookie('mycookie', 'cool cookie', {maxAge: 1000*60*60*24*30*365*200});
  if (!req.session.secretValue) {
    req.session.secretValue = new Date ();
  }
  res.send(req.session);
});

const authController = require('./src/authController.js');
app.use (authController);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});