const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 3000;
const cors = require('cors');
const busboy = require('connect-busboy')
const mongoose = require('mongoose');
const configjson = require('./config/dbconfig.json');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(busboy()); 

//connecting mongo
mongoose.connect(configjson.mongo.mongoURI, { useNewUrlParser: true });

require('./src/routes/user')(app);
require('./src/routes/routes')(app);
require('./src/routes/auth')(app);
require('./src/routes/admin')(app);


module.exports = app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//to-do
// go to services/passport.js and replace the hardcoded string to DB call