const {Routes, Router} = require('express')

const route = Router()

const {citaGet, citaPost, citaPut, citaDelete} = require('../controllers/cita')

route.get ('/', citaGet)

route.post ('/', citaPost)

route.put ('/', citaPut)

route.delete ('/', citaDelete)

module.exports = route