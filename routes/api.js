const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    // Ninja.find({}).then(function(data){
    //     res.send(data)
    // });
    Ninja.geoNear(
        {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(data){
        res.send(data);
    });

});

// add a new ninja to db
router.post('/ninjas', function(req, res, next){
    // var ninja = new Ninja(req.body);
    // ninja.save()
    // OR //
    //creates and saves a new instance of Ninja. It's a promise so we have to wait for it to complete so we use .then
    Ninja.create(req.body).then(function(data){
        res.send(data)
    }).catch(next); 
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    //    finds the updates document and returns that
        Ninja.findOne({_id: req.params.id}).then(function(data){
            res.send(data);
        })
    });
});

// delete a ninja in the db
router.delete('/ninjas/:id', function(req, res, next){
    // console.log(req.params.id);
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(data){
        res.send(data);
    });
});

module.exports = router;