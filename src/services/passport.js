const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

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




  var jwtStrategy = new JWTStrategy(jwtOptions, function(jwt_payload, next) {
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

const googleStrategy =   new GoogleStrategy({
    clientID: 'YOUR_CLIENTID_HERE',
    clientSecret: 'YOUR_CLIENT_SECRET_HERE',
    callbackURL: 'http://localhost:8000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  //find the user in db , if not exists create one
    done(null, profile); // passes the profile data to serializeUser
}
));


passport.use(googleStrategy)
passport.use(localStrategy)
passport.use(jwtStrategy);

module.exports = {
  passport : passport,
  jwtOptions: jwtOptions
}