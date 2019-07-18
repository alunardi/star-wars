const express = require('express')
const router = express.Router()

const planetController = require('../controllers/planet.controller')

router.get('/', planetController.getAll)

router.get('/id/:id', planetController.getById)

router.get('/name/:name', planetController.getByName)

router.post('/create', planetController.createPlanet)

router.delete('/delete/:id', planetController.deletePlanet)

module.exports = router
