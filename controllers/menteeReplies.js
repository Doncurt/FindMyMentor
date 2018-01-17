var MentorPost = require('../models/mentorPost');
var MenteeReply = require('../models/menteeReply');

module.exports = (app) => {
      // CREATE

    app.post('/mentor-posts/:mentorPostId/menteeReply', (req, res) => {
      // INSTANTIATE INSTANCE OF MODEL

      var menteeReply = new MenteeReply(req.body);
      console.log("Creating:")
      console.log(req.body)
      // SAVE INSTANCE OF POST MODEL TO DB

      MentorPost.findById(req.params.mentorPostId).then((mentorPost) => {
        /// found a post by id
        mentorPost.menteeReplies.unshift(menteeReply)
        return mentorPost.save()
      }).then((mentorPostId) => {
        // post saved
        return menteeReply.save()
      }).then(() => {
        // menteeReply saved
        res.redirect('/mentor-posts/' + req.params.mentorPostId)
      }).catch((err) => {
        console.log(err.message);
      })
  })

  //new nested menteeReplies// New menteeReplies
    app.get('/menteeReplies/:menteeReplyid/new',(req,res) =>{
        MenteeReply.findById(req.params.menteeReplyid).then((menteeReplies)=>{
            res.render('reply-new', {menteeReplies});

        })
    })
// nested menteeReplies
  app.post('/menteeReplies/:menteeReplyid', (req, res)=> {
       // INSTANTIATE INSTANCE OF MODEL
       var menteeReply = new MenteeReply(req.body);
       console.log(req.body)
       // SAVE INSTANCE OF POST MODEL TO DB

       MenteeReply.findById(req.params.menteeReplyid).then((origcomment)=>{
           // findById resolved
           console.log(origcomment)
           origcomment.menteeReplies.unshift(menteeReply)
           return origcomment.save()
       }).then((origcomment) => {
           // post.save resolved
           return menteeReply.save()
       }).then((origcomment) => {
           // comment.save resolved
           res.redirect('/')
       }).catch((err)=>{
           console.log(err.message, "Could not save comment!")
           res.redirect('/')
       })
   })
}
