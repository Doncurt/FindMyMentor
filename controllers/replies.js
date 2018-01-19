var MentorPost = require('../models/mentorPost');
var Comment = require('../models/comment');
var User = require('../models/user');

module.exports = (app) => {
  // NEW REPLY
  app.get('/mentor-posts/:mentorPostId/comments/:commentId/replies/new', (req, res) => {
  let mentorPost
  MentorPost.findById(req.params.mentorPostId).then((p) => {
    mentorPost = p
    return Comment.findById(req.params.commentId)
  }).then((comment) => {
    res.render('replies-new', { mentorPost, comment });
  }).catch((err) => {
    console.log(err.message);
  });
});

  // CREATE REPLY
  app.post('/mentor-posts/:mentorPostId/comments/:commentId/replies', (req, res) => {
    // LOOKUP THE PARENT POST
   MentorPost.findById(req.params.mentorPostId).then((mentorPost) => {
     // FIND THE CHILD COMMENT
     var comment = mentorPost.comments.id(req.params.commentId);
     // ADD THE REPLY
     comment.comments.unshift(req.body);
     // SAVE THE CHANGE TO THE PARENT DOCUMENT
     return mentorPost.save();
   }).then((mentorPost) => {
     // REDIRECT TO THE PARENT POST#SHOW ROUTE
     res.redirect('/mentor-posts/' + mentorPost._id);
   }).catch((err) => {
     console.log(err.message);
   });
 });
  });

}
