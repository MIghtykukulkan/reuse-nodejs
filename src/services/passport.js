const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;

//hardcoded users need to be removed while working with DB
var users = [
    {
      id: 1,
      username: 'jonathanmh',
      password: '%2yx4'
    },
    {
      id: 2,
      username: 'test',
      password: 'test'
    }
  ];

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'secret string';
  const jwt = require('jsonwebtoken');
  

var localStrategy = new LocalStrategy({ usernameField: 'username', passwordField: 'password'},
function (email, password, cb) {
    //Assume there is a DB module pproviding a global UserModel
     // replace the line below by making a DB call to return the user obj in the routeer
     var user = users[_.findIndex(users, {username: email, password:password})];
     //console.log(user)
     if (user) {
       var token = jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: '1h' });
       user.token = token;
       //console.log(user)
       return cb(null, user, { message: 'Logged In Successfully'});
     } else {
      return cb(null, false, {message: 'Incorrect email or password.'});
     }
})




  var strategy = new JWTStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // replace the line below by making a DB call to return the user obj in the routeer
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
      var token = jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: '1h' });
      user.token = token;
      next(null, user);
    } else {
      next(null, false);
    }
  });

passport.use(localStrategy)
passport.use(strategy);

module.exports = {
  passport : passport,
  jwtOptions: jwtOptions
}