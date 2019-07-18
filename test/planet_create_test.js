const assert = require('assert')
const PlanetModel = require('../src/models/planet.model')

describe('Criando planetas...', () => {
    it('Cria um planeta', (done) => {
        const planet = new PlanetModel({
            name: 'Tatooine',
            climate: 'arid',
            terrain: 'desert',
            planet_id: '1',
            film_appearance: '6'
        })
        planet.save()
            .then(() => {
                assert(!planet.isNew)
                console.log('Criou o planeta...')
                done()
            })
    })
})