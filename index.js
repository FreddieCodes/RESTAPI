const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const mongoose = require('mongoose');

// setup express app
const app = express();

// connect to mongodb
// will create ninjago database for us
mongoose.connect('mongodb://localhost/ninjago');
// overrided deprecated mongoosePromise
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());

// initialize routes that have been required and saved to routes.
app.use('/api', routes);

// error handlind middleware (we create)
app.use(function(err, req, res, next){
    // console.log(err);
    // respondes with a status of 422 which is for errors and then sends an object to the response containing the error message;
    res.status(422).send({error: err.message})
})

// listen for requests
// either listens to requests set from an environment variable or port 4000
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});