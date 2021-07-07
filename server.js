const express = require('express');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();


const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


class Tweet extends Model {}

Tweet.init({
  content: { type: DataTypes.STRING(250), allowNull: false },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, { sequelize, modelName: 'tweet' })
Tweet.sync()

const users= [{id: 'mifi', username: 'mifi', name: 'Milagros', password: '1234'} ]




// middleware's 
// -----------------------------------------------

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
app.use(express.static('views'));

app.use(session(
  {
    name: 'sid',
    secret:'secret', 
    resave:false,
    saveUninitialized:false,
    cookie:{}
  }
));

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
}


//  GET's
// ------------------------------------------------------------------------------

app.get('/', (req, res) => {
  const { userId } = req.session;
  if(userId) return res.redirect('/home');
  res.render('index');
});

app.get('/tweets',(req, res)=> {
  Tweet.findAll().then(tweets=> req.json(tweets))
})

app.get('/home', redirectLogin, (req, res) => {
  Tweet.findAll()
  .then(tweets=> {return res.render('home', {data: tweets})}) 
});


app.get('/login', redirectHome,  (req, res) => {
  res.render('login', {incorrect: false} )
});


app.get('/register', redirectHome, (req, res) => {
  res.render('register', {exist: false})
});


app.get('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.redirect('/home');
    }
    res.clearCookie('sid');
    res.redirect('/');
  })
});

// POST's
// ------------------------------------------------------------------------------



app.post('/login', redirectHome, (req, res) => {
  const { username, password } = req.body;
  
  if(username && password) {
      const user = users.find(user => user.username === username && user.password==password);
      if(user) {
        req.session.userId = user.id;
        userInLine= username
        return res.redirect('/home');
      }
    }
  
    res.render('login', {incorrect: true} )
});



app.post('/register', redirectHome, (req, res) => {
  const { username, name, password} = req.body;
  const exists = users.some(user => user.username== username && user.password== password);
  if(!exists) {
      const user = {
        id: username,
        username,
        name,
        password
      }
      users.push(user);
      return res.redirect('/');
}
return res.render('register', {exist: true})
});

app.post('/home', (req, res) => {
  const { content} = req.body;
  Tweet.create({content: content, username: req.session.userId})
    .then(() => {
      return res.redirect('/home')
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Upss 😥')
    })
})




// detele all tweets
//-----------------------------------------------------------------

app.get('/clear', (req, res) => {
  Tweet.destroy({where: {}})
    .then(() => {return res.redirect('/home')})
    .catch(error => {
      console.error(error)
      res.status(500).send('Upss 😥')
    })
})



//------------------------------------------------------------------

app.listen(3001, (err) => {
  if(err) {
   console.log(err);
 } else {
   console.log('Listening on localhost:' + 3001);
 }
});
