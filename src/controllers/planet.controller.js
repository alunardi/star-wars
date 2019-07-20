const PlanetModel = require('../models/planet.model')
const axios = require('axios')

exports.getAll = (req, res) => {
    let query = {}
    if (req.query.name) {
        query = req.query
    }
    PlanetModel.find(query, (err, results) => {
        if (err) {
            return res.send('Erro ao listar os planetas')
        }
        res.send(results)
    })
}

exports.getById = (req, res) => {
    PlanetModel.findById(req.params.id, (err, results) => {
        if (err) {
            return res.send('Erro! Esse planeta não existe')
        }
        res.send(results)
    })
}

exports.createPlanet = (req, res) => {
    axios.get(process.env.SWAPI_API, {
        params: {
            search: req.body.name
        }
    }).then(resp => {
        if (resp.data.results.length === 0) {
            return res.send('Não existe planeta com esse nome!')
        }
        if (resp.data.results[0].name !== req.body.name) {
            return res.send('Existe um planeta com o nome próximo! Verifique o nome!')
        }
        let arrayUrl = resp.data.results[0].url.split('/')
        let lengthArrayUrl = arrayUrl.length
        let positionId = lengthArrayUrl - 2
        let planetId = arrayUrl[positionId]

        savePlanet(resp, req, res, planetId)
    }).catch(console.log('Erro'))
}

exports.deletePlanet = (req, res) => {
    PlanetModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return res.send('Erro ao excluir o planeta!')
        }
        res.send('Planeta excluído com sucesso!')
    })
}

function savePlanet(resp, req, res, planetId) {
    let planet = new PlanetModel(
        {
            name: req.body.name,
            climate: req.body.climate,
            terrain: req.body.terrain,
            film_appearance: resp.data.results[0].films.length,
            planet_id: planetId,
        }
    )

    planet.save((err) => {
        if (err) {
            return res.send('Erro ao criar o planeta!')
        }
        res.send('Planeta criado com sucesso!')
    })
}
