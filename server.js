// .env rewuirement
require('dotenv').config();
//module imports and node
const express = require('express')
const methodOverride = require('method-override')
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
//bodyparser
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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






  //middle wear for authori
  var checkAuth = (req, res, next) => {
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

// Model
const MentorPost = require('./models/mentorPost');
const User = require('./models/user');
//Rputes for navigation
require('./controllers/auxRoutes.js')(app);
require('./controllers/menteeReplies.js')(app);
require('./controllers/auth.js')(app)
require('./controllers/mentorRoutes.js')(app)

app.listen(process.env.PORT||3000, ()=> {
  console.log('Server for FindMyMentor listening on port 3000!')
})
