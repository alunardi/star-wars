const PlanetModel = require('../models/planet.model')
const axios = require('axios')

/**
 * @param req
 * @param res
 */
exports.getPlanet = (req, res) => {
    let query = {}
    if (req.query.name) {
        query = req.query
    }
    PlanetModel.find(query, (err, results) => {
        if (err) {
            return res.send('Erro ao listar os planetas!')
        }
        if (results.length === 0) {
            return res.send('Não existe nenhum planeta cadastrado!')
        }
        res.send(results)
    })
}

/**
 * @param req
 * @param res
 */
exports.getPlanetById = (req, res) => {
    PlanetModel.findById(req.params.id, (err, results) => {
        if (err) {
            return res.send('Erro! Esse planeta não existe')
        }
        if (!results) {
            return res.send('Esse planeta não existe!')
        }
        res.send(results)
    })
}

/**
 * @param req
 * @param res
 * @returns {*|void}
 */
exports.createPlanet = (req, res) => {
    if (!req.body.name) {
        return res.send('Informe o nome do planeta!')
    }
    axios.get(process.env.SWAPI_API, {
        params: {
            search: req.body.name
        }
    }).then(resp => {
        if (resp.data.results.length === 0) {
            return res.send('Não existe planeta com esse nome!')
        }
        if (resp.data.results[0].name !== req.body.name) {
            return res.send('Existe um planeta com o nome próximo. Verifique o nome!')
        }
        if (!resp.data.results[0].url) {
            return res.send('Não foi possível encontrar o código desse planeta!')
        }
        let url = resp.data.results[0].url
        let planetId = getPlanetId(url)

        savePlanet(resp, req, res, planetId)
    }).catch(console.log('Erro'))
}

/**
 * @param req
 * @param res
 */
exports.deletePlanet = (req, res) => {
    PlanetModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return res.send('Erro ao excluir o planeta!')
        }
        res.send('Planeta excluído com sucesso!')
    })
}

/**
 * @param url
 * @returns {string}
 */
function getPlanetId(url) {
    let arrayUrl = url.split('/')
    let positionId = arrayUrl.length - 2
    return arrayUrl[positionId]
}

/**
 * @param resp
 * @param req
 * @param res
 * @param planetId
 */
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
