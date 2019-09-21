var assert = require('assert');
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
chai.should();
chai.use(chaiHttp);

describe("my tests", function(){
  describe ("all api", function(){

  var token = null;

  // getting token from sign-in
  before(function(done) {
    chai.request(server)
      .post('/sign-in')
      .send({ username: "test", password: "test" })
      .end(function(err, res) {
        token = res.body.token; // Or something
        done();
      });
  });

  // testing the test route
  it ("testing the / route by passing the authtoken", (done)=>{
     chai.request(server)
         .get("/")
         .set('Authorization', 'Bearer ' + token)
         .end((err, result)=>{
             result.should.have.status(200);              
             done()
         })
     })

     //testing the test route without passing the auth token
     it ("testing the / route without passing the authtoken- expecting 401", (done)=>{
      chai.request(server)
          .get("/")
          .end((err, result)=>{
              result.should.have.status(401);              
              done()
          })
      })
  })
  /// some other tests we will write here
})



