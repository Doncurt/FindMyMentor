var MentorPost = require('../models/mentorPost');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

/*
ALL ROUTES FOR ANYTHING INVOLVING THE MENTOR/MENTEE PAGES

*/
// INDEX
module.exports = (app) => {

app.get('/', (req, res) => {
  var currentUser = req.user;

  MentorPost.find({}).then((mentorPosts) => {
    res.render('mentor-index', { mentorPosts, currentUser })
  }).catch((err) => {
    console.log(err.message);
  });
})
//CREATE'S GET ROUTE
app.get('/mentor-posts/new', (req, res) => {
  res.render('mentor-posts-new', {});
})

// CREATE'S POST ROUTE
app.post('/mentor-posts', (req, res) => {
  MentorPost.create(req.body).then((mentorPosts) => {
    console.log(mentorPosts);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
// SHOW
app.get('/mentor-posts/:id', (req, res) => {
  MentorPost.findById(req.params.id).then((mentorPosts) => {
    res.render('mentor-posts-show', { mentorPosts,currentUser})
  }).catch((err) => {
    console.log(err.message);
  })
})

} //END OF MODULE EXPORT
