const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const _ = require('lodash');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

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
    },
    { id: 110168773223940141757,
      username: 'uma shankar',
      password: 'test'}
  ];

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'secret string';
  
  

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
  clientID: '155905216075-mit1e30iucb0c0isi0akb8j1rvbj3m7s.apps.googleusercontent.com',
  clientSecret: 'hMF-xIYs0Fij3skixH9hkD5p',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
   var user = users[_.findIndex(users, {username: profile.displayName})];
   console.log(user)
   /*
   User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
      */
     console.log(jwtOptions)
    var token = jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: '1h' });
    return done(null, {
      profile: profile,
      token: token
  });
});


passport.use(googleStrategy);
passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = {
  passport : passport,
  jwtOptions: jwtOptions
}