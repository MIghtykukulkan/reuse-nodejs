const passport = require('passport')
require('../services/passport')


module.exports = router => {

    //example of a secured route
    router.post('/sign-up', async (req, res) => {
        //save the user in DB
    });

    router.post('/forgotPassword', async(req, res)=>{
        //businesslogic for password reset
    })

    router.post('/sign-in', function (req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            console.log("user:",err, user, info)
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
           req.login(user, {session: false}, (err) => {
               if (err) {
                   res.send(err);
               }
               // generate a signed son web token with the contents of user object and return it in the response
              
               return res.json({"message": "login successfull", "token":user.token, "expires-in":"1 Hour"});
            });
        })(req, res);
    });
    
}