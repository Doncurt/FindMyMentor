// .env rewuirement
require('dotenv').config();
//module imports and node
const express = require('express')
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
//bodyparser
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express()
// mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1/findMyMentor');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
// to get css from other folders
app.use(express.static('public'));


// sets mongoose promise to built in JS promise
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost/findMyMentor', { useMongoClient: true });

  //middle wear for authori
  var checkAuth = (req, res, next) => {
    console.log("Checking authentication");

    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jsonwebtoken.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }

    next()
  }

  app.use(checkAuth)

// Handlebars code for middle where
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Rputes for navigation
require('./controllers/auxRoutes.js')(app);
require('./controllers/menteeReplies.js')(app);
require('./controllers/auth.js')(app)
require('./controllers/mentorRoutes.js')(app)

app.listen(process.env.PORT||3000, ()=> {
  console.log('Server for PutIt listening on port 3000!')
})
