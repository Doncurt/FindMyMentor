var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);
var User = require('../models/user');

describe('User auth testing ', function() {

    it('shouldnt be able to login if not signedup', function (done) {
   agent
     .post('/login', { username: "test", password: "password" })
     .end(function (err, res){
       res.status.should.be.equal(401);
       done();
     });

 });

 beforeEach(() => {
     return User.findOneAndRemove({ username: "test" })
 })
 // signup
it('should be able to signup', (done) => {
    agent
      .post('/signup')
      .type('form') // Put this on github - issue
      .send({ username: "test", password: "password" })
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(200);
        res.should.have.cookie("nToken");
        done();
    });
})

//Logout
it('should logout and clear cookies', function (done) {
 agent
   .get('/logout')
   .end(function (err, res) {
     res.should.have.status(200);
     res.should.not.have.cookie("nToken");
     done();
   });
});
// login
it('should login', function (done) {
 agent
   .post('/login')
   .send({ email: "username", password: "password" })
   .end(function (err, res) {
     res.should.have.status(200);
     res.should.have.cookie("nToken");
     done();
   });
});

});
