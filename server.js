const express = require('express');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const { Tweet } = require('./db');
const { redirectLogin } = require('./middlewares/redirectLogin');
const { redirectHome } = require('./middlewares/redirectHome');
const { postlogin, getlogin } = require('./controllers/login');
const { postregister, getregister } = require('./controllers/register');
const { posthome, gethome } = require('./controllers/home');
const { getindex } = require('./controllers/getindex');
const { gettweets } = require('./controllers/gettweets')
require('dotenv').config();

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// middleware's 
// -----------------------------------------------

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
app.use(express.static('views'));

app.use(session(
  {
    name: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {}
  }
));

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

//  GET's
// ------------------------------------------------------------------------------

app.get('/', getindex);

app.get('/tweets', gettweets)

app.get('/home', redirectLogin, gethome);

app.get('/login', redirectHome, getlogin);

app.get('/register', redirectHome, getregister);


app.get('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home');
    }
    res.clearCookie('sid');
    res.redirect('/');
  })
});

// POST's
// ------------------------------------------------------------------------------



app.post('/login', redirectHome, postlogin);

app.post('/register', redirectHome, postregister);

app.post('/home', posthome)


// detele all tweets
//-----------------------------------------------------------------

app.get('/clear', (req, res) => {
  Tweet.destroy({ where: {} })
    .then(() => { return res.redirect('/home') })
    .catch(error => {
      console.error(error)
      res.status(500).send('Upss 😥')
    })
})



//------------------------------------------------------------------

app.listen(3001, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port ' + 3001);
  }
});
