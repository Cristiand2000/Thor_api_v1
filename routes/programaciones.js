const{Router} = require ('express')

const route = Router()

const {programacionGet,programacionPost,programacionPut,programacionDelete} = require('../controllers/programacion')

route.get('/', programacionGet )

route.post('/', programacionPost )

route.put('/', programacionPut )

route.delete('/', programacionDelete )


module.exports = route