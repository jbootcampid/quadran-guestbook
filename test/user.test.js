process.env.NODE_ENV = 'test';

import config from './../config/config';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server.js'

import User from '../server/models/user.model'; 



let should = chai.should();
chai.use(chaiHttp);

describe('User', () => {
  /*  beforeEach((done) => {
     User.deleteMany({}, (err) => {
      done();
    });
  });  */
  /* describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  }); */
  /*
  * Test the /POST route
  */
  describe('/POST user', () => {
    it('it should not POST a user without pages field', (done) => {
      let user = {
        name: "diancp",
        email: "diancp@gmail.com",
        password: "123456"
      }
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('pages');
          res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });

  });
});

