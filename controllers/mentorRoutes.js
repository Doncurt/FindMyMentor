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
    const currentUser = req.user;
    res.render('mentor-index', { mentorPosts, currentUser })
  }).catch((err) => {
    console.log(err.message);
  });
})
//CREATE'S GET ROUTE
app.get('/mentor-posts/new', (req, res) => {
  const currentUser = req.user;
  res.render('mentor-new', {});
})

// CREATE'S POST ROUTE
app.post('/mentor-posts', (req, res) => {
  req.body.author = req.user._id
  var mentorPosts = new MentorPost(req.body);
  mentorPosts.save().then((mentorPost) => {
    console.log(mentorPost);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
// SHOW
app.get('/mentor-posts/:id', (req, res) => {
  var currentUser = req.user;
  MentorPost.findById(req.params.id).then((mentorPost) => {
    const currentUser = req.user;
    res.render('mentor-posts-show', { mentorPost, currentUser})
  }).catch((err) => {
    console.log(err.message);
  })
})

} //END OF MODULE EXPORT
