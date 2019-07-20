const express = require('express')
const router = express.Router()

const planetController = require('../controllers/planet.controller')

router.get('/', planetController.getPlanet)

router.get('/id/:id', planetController.getPlanetById)

router.post('/create', planetController.createPlanet)

router.delete('/delete/:id', planetController.deletePlanet)

module.exports = router
