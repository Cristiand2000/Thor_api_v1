const {Routes, Router} = require('express')

const route = Router()

const {servicioGet, servicioPost, servicioPut, servicioDelete} = require('../controllers/servicio')

route.get ('/', servicioGet)

route.post ('/', servicioPost)

route.put ('/', servicioPut)

route.delete ('/', servicioDelete)

module.exports = route
