var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);
var User = require('../models/user');

// Testing homepage
describe('site', () => {
  it('Should display a homepage', (done) => {

    chai.request('localhost:3000')
      .get('/')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        res.status.should.be.equal(200)
        done()
      })
  })
})

// testing resources
describe('resources', () => {
  it('Should show a resource page', (done) => {

    chai.request('localhost:3000')
      .get('/resources')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        res.status.should.be.equal(200)
        done()                           .
      })
  })
})
//Testing signup
describe('signup', () => {
  it('Should show a signup page', (done) => {

    chai.request('localhost:3000')
      .get('/signup')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        res.status.should.be.equal(200)
        done()                           .
      })
  })
})
//Testing contact
describe('contact', () => {
  it('Should show a contact page', (done) => {

    chai.request('localhost:3000')
      .get('/contact')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        res.status.should.be.equal(200)
        done()                           .
      })
  })
})
