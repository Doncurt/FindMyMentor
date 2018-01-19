var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);
var MentorPost = require('../models/mentorPost');

describe('Mentor Posts', () => {
  it('should post a mentor add', (done) => {
    // test code
    Mentorpost.find(function(err, mentorPosts) {
    var mentorPostCount = mentorPosts.count;

  var mentorPost = { name : "John Smith", socialLink1: "https://www.facebook.com", summary: "post summary",interest1:"Data Science" }

  Mentorpost.findOneAndRemove(mentorPost, function() {
    Mentorpost.find(function(err, mentorPosts) {
      var mentorPostCount = mentorPost.count;
      chai.request('localhost:3000')
        .post('/mentor-posts', mentorPost)
        .end(function (err, res){
          Mentorpost.find(function(err, mentorPosts) {
            mentorPostCount.should.be.equal(tours + 1);
            res.should.have.status(200);
          done();
        });
      });
    });
  });
  })
})
})
