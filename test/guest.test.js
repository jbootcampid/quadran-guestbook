process.env.NODE_ENV = 'test';

import config from './../config/config';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server.js'
import Guest from '../server/models/guest.model';

let should = chai.should();
chai.use(chaiHttp);

describe('Guest', () => {

  // delete all data first
     beforeEach((done) => {
      Guest.deleteMany({}, (err) => {
        done();
      });
  
    }); 

  /*
   * Test the /POST 
   */
  describe('/POST guest', () => {
    it('it should not POST a book without firstName field', (done) => {
      let guest = {
        lastName: "cp",
        email: "diancp@gmail.com",
        phoneNumber: "0813489898"
      }
      chai.request(server)
        .post('/api/guests')
        .send(guest)
        .end((err, res) => {

          res.should.have.status(400);
          res.body.should.have.property('error');
          res.body.should.have.property('error').contain('FirstName is required');
          done();
        });
    });
    it('it should POST a guest ', (done) => {
      let guest = {
        firstName: "kang",
        lastName: "dian",
        email: "kang@gmail.com",
        phoneNumber: "0813489898"

      }
      chai.request(server)
        .post('/api/guests')
        .send(guest)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Guest successfully added!');
          res.body.guest.should.have.property('firstName');
          res.body.guest.should.have.property('lastName');
          res.body.guest.should.have.property('email');
          res.body.guest.should.have.property('phoneNumber');
          done();
        });
    });
  });



  /*
   * Test the /GET all guest route
   */
  describe('/GET guest', () => {
    it('it should GET all the guests', (done) => {
      chai.request(server)
        .get('/api/guests')
        .end((err, res) => {
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id guest', () => {
    it('it should GET a guest by the given id', (done) => {
      const guest = new Guest({
        firstName: "mimi",
        lastName: "mama",
        email: "mima@gmail.com",
        phoneNumber: "0813489878"

      });

      guest.save((err, guest) => {
        chai.request(server)
          .get('/api/guests/' + guest.id)
          .send(guest)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('email');
            res.body.should.have.property('phoneNumber');
            res.body.should.have.property('_id').eql(guest.id);
            done();
          });
      });

    });
  });


  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id guest', () => {
    it('it should UPDATE a guest given the id', (done) => {
      const guest = new Guest({
        firstName: "nani",
        lastName: "nina",
        email: "nina@gmail.com",
        phoneNumber: "0813489445"

      });
      guest.save((err, guest) => {
        chai.request(server)
          .put('/api/guests/' + guest.id)
          .send({
            firstName: "nani",
            lastName: "nina",
            email: "ninaxx@gmail.com",
            phoneNumber: "0813489445"
          })
          .end((err, res) => {
            // res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Guest successfully updated!');
            res.body.guest.should.have.property('email').eql('ninaxx@gmail.com');
            done();
          });
      });
    });
  });


  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id guest', () => {
    it('it should DELETE a guest given the id', (done) => {
      const guest = new Guest({
        firstName: "nona",
        lastName: "nonon",
        email: "noon@gmail.com",
        phoneNumber: "0813489445"

      });
      guest.save((err, guest) => {
        chai.request(server)
          .delete('/api/guests/' + guest.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Guest successfully deleted!');
            done();
          });
      });
    });
  });

});

