const{Router} = require ('express')

const route = Router()

const {usuarioGet,usuarioPost,usuarioPut,usuarioDelete} = require('../controllers/usuarios')

route.get('/', usuarioGet )

route.post('/', usuarioPost )

route.put('/', usuarioPut )

route.delete('/', usuarioDelete )


module.exports = route