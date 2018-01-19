const MentorPost = require('../models/mentorPost');
const Comment = require('../models/comment');

module.exports = function(app) {
    // Create comment on the thread
    app.post('/mentor-posts/:mentorPostId/comments', function (req, res) {
        // If not logged in, do this
        if (req.user == null) {
            res.redirect('/login');
            return
        }
        // New comment for post
        let comment = new Comment(req.body);
        // Find the original post to put new comment on
        MentorPost.findById(req.params.mentorPostId)
        .then((mentorPost) => {
            // Shift comments to post and save post
            mentorPost.comments.unshift(comment)
            return mentorPost.save()
        }).then((mentorPostpost) => {
            // Save new comment
            return comment.save()
        }).then((comment) => {
            res.redirect('/mentor-posts/' + req.params.mentorPostId)
        }).catch((err) => {
            console.log(err.message, "Could not save comment!")
            res.send(err.message)
        })
    })

    // New comments
    app.get('/comments/:commentid/new', (req, res) => {
        // Get the original comment for viewing as well
        Comment.findById(req.params.commentid)
        .then((comment) => {
            res.render('comment-new', {comment});
        })
    })

    // Comments for comments!
    app.post('/comments/:commentid', function (req, res) {
        // If not logged in, do this
        if (req.user == null) {
            res.redirect('/login');
            return
        }
        // New comment (for comment)
        let comment = new Comment(req.body);
        // Find original comment to put new comment on
        Comment.findById(req.params.commentid)
        .then((origcomment) => {
            // add a new comment on original comment and save
            origcomment.comments.unshift(comment)
            return origcomment.save()
        }).then((origcomment) => {
            // Save new comment
            return comment.save()
        }).then((origcomment) => {
            res.redirect('/')
        }).catch((err) => {
            console.log(err.message, "Could not save comment!")
            res.send(err.message)
        })
    })

}
