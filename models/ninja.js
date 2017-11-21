const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 //  Add in geolocation GEOJSON.org
    // "geometry": {
    //     "type": "Point",
    //     "coordinates": [125.6, 10.1]
    //   },


// create geolocaction Schema

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

// create ninja Schema & model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
})

// model

// will create a collection called ninjas using the ninjaSchema
const Ninja = mongoose.model('ninja', NinjaSchema);

// export the model to be used in other files
module.exports = Ninja;