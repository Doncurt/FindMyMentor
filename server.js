// .env rewuirement
//require('dotenv').config();
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
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/findMyMentor');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

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


app.listen(process.env.PORT||3000, ()=> {
  console.log('Server for PutIt listening on port 3000!')
})
