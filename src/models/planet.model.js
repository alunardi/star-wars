const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PlanetSchema = new Schema({
    name: {type: String, required: true},
    climate: {type: String, required: true},
    terrain: {type: String, required: true},
    film_appearance: {type: Number, required: true},
    planet_id: {type: Number, required: true},
})

module.exports = mongoose.model('planet', PlanetSchema)
