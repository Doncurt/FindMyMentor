require('dotenv').config()
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');


const app = express();
// Middleware
// // Body Parser, method override
app.use(bodyParser.urlencoded({ extended: true }));
// // Express - public
app.use(express.static('public'));
// // Cookie Parser
app.use(cookieParser());
// // Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// sets mongoose promise to built in JS promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/findMyMentor', { useMongoClient: true });





// // Authorization
let checkAuth = (req, res, next) => {
  // If there's a cookie, they should be logged in
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    // Success! Decode the token, then put that payload into req.user
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next()
}
// // Run checkAuth
app.use(checkAuth)

// Model
const MentorPost = require('./models/mentorPost');
const User = require('./models/user');
//Rputes for navigation
require('./controllers/auxRoutes.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app)
require('./controllers/mentorRoutes.js')(app)

app.listen(process.env.PORT||3000, ()=> {
  console.log('Server for FindMyMentor listening on port 3000!')
})
