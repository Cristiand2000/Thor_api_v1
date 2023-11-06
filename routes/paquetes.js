const {Routes, Router} = require('express')

const route = Router()

const {paqueteGet, paquetePost, paquetePut, paqueteDelete} = require('../controllers/paquete')

route.get ('/', paqueteGet)

route.post ('/', paquetePost)

route.put ('/', paquetePut)

route.delete ('/', paqueteDelete)

module.exports = route
