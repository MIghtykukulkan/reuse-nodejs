// use this routes to define admin related routes
const passport = require('passport')
require('../services/passport')

module.exports = router => {

    router.get('/admin/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    
        console.log(req.user)
        
        res.send(req.user)  
    });

}