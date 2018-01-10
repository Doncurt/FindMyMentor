/*
ALL ROUTES FOR ANYTHING INVOLVING THE MENTOR/MENTEE PAGES

*/
// INDEX
app.get('/', (req, res) => {
  var currentUser = req.user;

  Post.find({}).then((mentorPosts) => {
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
  Review.create(req.body).then((mentorPosts) => {
    console.log(mentorPosts);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
// SHOW
app.get('/mentor-posts/:id', (req, res) => {
  Review.findById(req.params.id).then((mentorPosts) => {
    res.render('mentor-posts-show', { mentorPosts,currentUser})
  }).catch((err) => {
    console.log(err.message);
  })
})
