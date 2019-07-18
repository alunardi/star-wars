const assert = require('assert')
const PlanetModel = require('../src/models/planet.model')

describe('Lendo o planeta...', () => {
    let planet
    beforeEach((done) => {
        planet = new PlanetModel({
            name: 'Tatooine',
            climate: 'arid',
            terrain: 'desert',
            planet_id: '1',
            film_appearance: '6'
        })
        planet.save()
            .then(() => done())
    })

    it('Encontrei um planeta com o nome Tatooine', (done) => {
        PlanetModel.findOne({name: 'Tatooine'}, (err, _planet) => {
            assert(_planet.name === 'Tatooine')
            console.log('Leu o planeta pelo nome...')
            done()
        })
    })

    it('Encontrei um planeta com o ID', (done) => {
        PlanetModel.findOne({_id: planet._id}, (err, _planet) => {
            let oldId = _planet._id.toString()
            let newId = planet._id.toString()
            assert(newId === oldId)
            console.log('Leu o planeta pelo ID...')
            done()
        })
    })
})