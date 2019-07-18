const assert = require('assert')
const PlanetModel = require('../src/models/planet.model')

describe('Excluindo um planeta', () => {
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

    it('Remove um planeta pelo ID', (done) => {
        PlanetModel.findByIdAndRemove(planet._id, () => {
            PlanetModel.findById(planet._id, (err, _planet) => {
                assert(_planet === null)
                console.log('Excluiu o planeta...')
                done()
            })
        })
    })
})
