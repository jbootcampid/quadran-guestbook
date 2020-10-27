process.env.NODE_ENV = 'test';

import config from './../config/config';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server.js'

import User from '../server/models/user.model';



let should = chai.should();
chai.use(chaiHttp);

describe('Books', () => {

  /*beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    });
  });*/

  describe('/GET user', () => {
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
  });
 /*  describe('/POST user', () => {

    it('it should POST a user ', (done) => {
      let user = {
        name: "yoni",
        email: "yoni@gmail.com",
        password: "123456"

      }
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User successfully added!');
          res.body.user.should.have.property('name');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('password');
          done();
        });
    });
  });
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      let user = new User({ name: "kangdian", email: "kang@gmail.com", password: "123456" });
      user.save((err, user) => {
        chai.request(server)
          .get('/api/users/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            res.body.should.have.property('_id').eql(user.id);
            done();
          });
      });

    });
  });
  describe('/PUT/:id user', () => {
    it('it should UPDATE a book given the id', (done) => {
      let user = new User({ name: "kangdian", email: "kangcp@gmail.com", password: "123456" })
      user.save((err, user) => {
        chai.request(server)
          .put('/api/users/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User updated!');
            done();
          });
      });
    });
  }); */
  /*
   * Test the /DELETE/:id route
   */
  /* describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', (done) => {
      let user = new User({ name: "kangdian", email: "kangcp@gmail.com", password: "123456" })
      user.save((err, user) => {
        chai.request(server)
          .delete('/api/users/' + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            //res.body.should.have.property('message').eql('Book successfully deleted!');
            //res.body.result.should.have.property('ok').eql(1);
           // res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  }); */
});

